/**

// Context Provider Useage:

import { DayworkerContext, dayworkerProvider } from 'dayworker';
const DayworkerProvider = ({children}) => {
    const value = dayworkerProvider();
    return <DayworkerContext.Provider value={value}>{children}</DayworkerContext.Provider>
}

<DayworkerProvider>{children}</DayworkerProvider>

*/

import React, {
    useCallback, useContext, useEffect, useMemo, useState
} from 'react';

import { 
    getFirestore, collection, query, where, orderBy, startAt, endAt, and, or,
    getDocs, setDoc, doc, getDoc, GeoPoint, serverTimestamp
} from "firebase/firestore";

import {
    getStorage,
    ref as storageCreateRef,
    uploadString as storageUploadString,
    getDownloadURL
} from "firebase/storage";

import {
    initializeApp, getApps
} from "firebase/app";

import { 
    getAuth, signInWithEmailAndPassword,
    createUserWithEmailAndPassword, sendPasswordResetEmail
} from "firebase/auth";

import * as geofire from 'geofire-common';

import * as utils from './utils';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};
const googleMapsConfig = {
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
};

let env = process.env.NODE_ENV;
// if (env === 'production') env = '(default)';
if (env === 'production') env = 'development';

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

const auth = getAuth(app);

const db = getFirestore(app, env);
const defaultDB = env != '(default)' ? getFirestore(app, '(default)') : db;
const storage = getStorage(app);

const cache = new Map();

const signOut = async () => {
    return auth.signOut()
}

const signIn = async (email, password) => {
    return signInWithEmailAndPassword(
        auth, 
        email.toLowerCase().trim(), 
        password.trim()
    );
}

const sendUpdatePasswordEmail = async (email) => {
    const emailClean = email.trim().toLowerCase();
    let query = new URLSearchParams({email: emailClean});
    const domain = window.location.protocol + '//' + window.location.host;
    const actionCodeSettings = {
        url: `${domain}/user/signin/?${query.toString()}`,
        /* iOS: {
           bundleId: 'com.example.ios'
        },
        android: {
          packageName: 'com.example.android',
          installApp: true,
          minimumVersion: '12'
        }, */
        handleCodeInApp: true
    };
    return sendPasswordResetEmail(auth, emailClean, actionCodeSettings);
}

const invalidateSignUpCredentials = (email, password, reject) => {
    if (!email.match(/^[^\@]{1,}\@[^\.]{1,}\.[a-z]{2,}$/gi))
        return reject("Email in wrong format");
    if (password.length < 5) return reject("Password too short");
    return false;
};

const invalidateSignUpInput = (input, reject) => {
    if (typeof input !== "object") return reject("Input format incorrect");
    return false;
};

const uploadFileBase64 = async (base64, path, format) => {
    format = format || 'data_url'; // 'base64' 'base64url' 'data_url'
    // const storage = getStorage(app);
    const storageRef = storageCreateRef(storage, path);
    return storageUploadString(storageRef, base64, format);
}

const updateProfileImage = async (uid, base64) => {
    // Check if uid exists
    const path = `${uid}/profileImage`;
    return new Promise((resolve, reject) => {
        uploadFileBase64(base64, path).then(async (res)=>{
            const url = await getFileURL(path);
            updateProfile({profileImage: url}).then(()=>{
                resolve(url);
            }).catch(err=>{
                reject(err);
            });
        }).catch(err=>{
            reject(err);
        });
    });
}

const getFileURL = async (name) => {
    // const storage = getStorage(app);
    const url = await getDownloadURL(storageCreateRef(storage, name))
    return url;
}

const stripHTML = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
}

const lastEmail = async () => {
    return new Promise(async (resolve, reject) => {
        const currentUID = auth?.currentUser?.uid;
        const q = query(collection(defaultDB, 'mail')/* , where('__name__', 'in', docs) */);
        const querySnapshot = await getDocs(q);
        const documents = [currentUID];
        const now = new Date().getTime()/1000;
        // console.log(firebase.firestore.FieldValue.serverTimestamp())
        querySnapshot.forEach(doc => {
            const minutesAgo = (now - doc._document.createTime.timestamp.seconds) / 60
            const hoursAgo = minutesAgo / 60
            const daysAgo = hoursAgo / 24
            documents.push({minutesAgo, hoursAgo, daysAgo, ...doc.data().to});
        })
        resolve(documents);
    })
}

const emailUser = async (emails, message, vars) => {
    emails = emails || [];
    message = message || {};
    vars = vars || {};  
    return new Promise((resolve, reject) => {
        const data = {
            to: Array.isArray(emails) ? emails : [emails],
        }
        if (!data.to.length) return reject("No email recipients");
        if (typeof message === 'string') data.template = {
            name: message,
            data: vars,
        }
        else if (message.html || message.text) data.message = {
            subject: message.subject || '(No Subject)',
            text: message.text || stripHTML(message.html),
            html: message.html || message.text
        }
        if (data.template && !data.template.name)
            return reject("No email message");
        if (data.message && (!data.message.text || !data.message.html))
            return reject("No email message");
        data.currentUID = auth?.currentUser?.uid;
        data.timestamp =  serverTimestamp() // Timestamp.now(); // new Date().getTime();
        const mailRef = collection(defaultDB, 'mail');
        const emailDoc = doc(mailRef);
        setDoc(emailDoc, data, { merge: true }).then(()=>{
            resolve('Email sent');
        }).catch((err)=>{
            reject("Email not sent: " + JSON.stringify(err));
        });
    })
}

const googleMapsGeolocate = async (address) => {
    const key = googleMapsConfig.apiKey;
    const q = new URLSearchParams({address, key}).toString();
    const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?${q}`);
    const data = await res.json()
    const response = {geoPoint: null, geohash: null}
    if (data.results.length)
        for(let component of data.results[0]?.address_components)
            if ( component.types.indexOf('postal_code')>-1 )
                response.zipcode = parseInt(component.long_name);
    const { lat, lng } = data.results[0].geometry.location;
    if (lat && lng) response.geoPoint = new GeoPoint(lat, lng);
    if (response.geoPoint)
        response.geohash = geofire.geohashForLocation([
            response.geoPoint._lat || response.geoPoint._latitude,
            response.geoPoint._long || response.geoPoint._longitude
        ]);
    return response;
}

const signUp = async (email, password, input, userType, lang) => {
    email = email.trim().toLowerCase();
    password = password.trim();
    return new Promise(async (resolve, reject) => {
        // Validate cred and input
        if (invalidateSignUpCredentials(email, password, reject)) return;
        if (invalidateSignUpInput(input, reject)) return;
        if ( input.zip ) {
            const { geoPoint, geohash } = await googleMapsGeolocate(input.zip);
            if (input.geoPoint === undefined && geoPoint) input.geoPoint = geoPoint;
            if (input.geohash === undefined && geohash) input.geohash = geohash;
        } else {
            if (input.geoPoint === undefined) input.geoPoint = null;
            if (input.geohash === undefined) input.geohash = null;
        }
        // TEST
        //return setTimeout(resolve, 3000, {email, password, input});
        // Register User
        let user;
        try {
            user = await createUserWithEmailAndPassword(
                auth,
                email.trim().toLowerCase(),
                password.trim()
            );
        } catch (err) {
            reject(err);
        }
        if (!user) return reject("User not created");
        const UID = auth.currentUser?.uid
        if (!UID) return reject("New UID not authenticated");
        if (input.uid === undefined) input.uid = UID;
        const profilesRef = collection(db, 'profiles');
        const templateName = `join-${userType.toLowerCase()}`;
        const templateLang = lang.toUpperCase();
        setDoc( doc(profilesRef, UID), input, { merge: true }).then((res)=>{
            console.log(res);
            // Send Welcome Email
            emailUser(email, `email--${templateName}--${templateLang}`, {
                name: input.name.trim(),
                year: new Date().getFullYear()
            }).then(message=>{
                resolve(input);
            }).catch(console.error);
        }).catch((err)=>{
            console.error(err)
            reject("Profile data not loaded");
        });
    });
}

const updateProfile = async data => {
    return new Promise(async (resolve, reject) => {
        const UID = auth.currentUser?.uid
        const profilesRef = collection(db, 'profiles');
        const profileRef = doc(profilesRef, UID);
        const profile = await getDoc( profileRef );
        if (!profile.exists()) return reject(`Profile ${UID} doesn't exist.`);
        if (typeof data.zip === 'number') {
            const { geoPoint, geohash } = await googleMapsGeolocate(data.zip);
            data.geoPoint = geoPoint;
            data.geohash = geohash;
        }
        setDoc( profileRef, data, { merge: true }).then(()=>{
            resolve(data);
        }).catch(err=>{
            reject(err)
        });
    })
}

const convertAuthErrorCodeToLangKey = code => {
    return code
        .replace(/^auth\//, 'ux.error.auth.')
        .replace(/\-([a-z])/g, (m, a)=>a.toUpperCase())
}

const matchesAuthErrorCode = code => {
    return !!code.match(/^auth\/[a-z\-]{1,}$/, code)
}

const processAuthError = error => {
    const {message, code} = error;
    console.log(code, message)
    const response = {origMessage: message, code}
    if (!code || code == '') return { ...response, message: 'ux.error.auth.unknownErrorOccured' }
    if (!matchesAuthErrorCode(code))
        return { ...response, message: 'ux.error.auth.unknownErrorOccured' }
    return { ...response, message: convertAuthErrorCodeToLangKey(code) }
}

const checkTranslated = (t, key) => {
    if ( typeof t !== 'function' ) return undefined;
    if ( typeof key != 'string' ) return undefined;
    const translated = t( key.trim() )
    if ( key.trim() == translated.trim() ) return false;
    return true;
}

const getConstants = async (docs) => {
    // const DEV = process.env.NODE_ENV == 'development'
    if ( cache.has('constants') ) {
        //if (DEV) console.log('cached constants loaded');
        return cache.get('constants');
    }
    const q = query(collection(db, 'constants'), where('__name__', 'in', docs));
    const querySnapshot = await getDocs(q);
    const documents = [];
    querySnapshot.forEach((doc) => {
        documents.push( doc.data() );
    })
    const _const = {}
    documents.forEach(({name, map})=>_const[name] = map);
    cache.set('constants', _const);
    return _const;
}

const getJobsInArea = async (area, onComplete) => {
    const q = query(collection(db, 'Worker Requests'), where('area', '==', area));
    const querySnapshot = await getDocs(q);
    const jobs = [];
    querySnapshot.forEach((doc) => {
        jobs.push( doc.data() );
    });
    onComplete({success: true, data: jobs});
}

const geolocateProfiles = async (center, radiusInM, queryParams) => {
    /* constraints = constraints || [];
    const postConstraints = [];
    const shouldInclude = profile => {
        let matched = false;
        if ( !postConstraints.length ) return matched;
        postConstraints.forEach(({field, value})=>{
            if ( matched ) return;
            if ( typeof profile[field] !== 'object' ) return;
            if ( !Array.isArray(profile[field]) ) return;
            if ( !value.length ) { matched = true; return; }
            let count = 0;
            value.forEach(v=>{
                if ( profile[field].indexOf(v)>-1 ) count++;
            })
            if (count == value.length) matched = true;
        });
        return matched;
    }
    const processConstraints = _where => {
        const [field, op, value] = _where;
        if (op == 'array-contains' && Array.isArray(value)) {
            const first = value.shift();
            postConstraints.push({field, value});
            _where[2] = first;
        }
        return where(..._where)
    } */
    if ( !queryParams.has('settings.userViewType') ) {
        queryParams.append('settings.userViewType', '1')
    }
    const centerArray = Array.isArray(center) ? center : [center._latitude, center._longitude];
    radiusInM = radiusInM || 50 * 1000;
    const constraints = []
    queryParams.delete('geoPoint')
    queryParams.delete('zoom')
    queryParams.forEach((value, name) => {
        if (value == '') return;
        switch(name) {
            case 'skills' :
                const trades = []
                value.split(',').map(v=>trades.push(
                    where('trades', 'array-contains', parseInt(v))
                ))
                constraints.push( and( or(...trades) ) )
                break;
            case 'availableWeekdays' :
                const days = []
                value.split(',').map(v=>days.push(
                    where(`${name}.${v}`, '==', true)
                ))
                constraints.push( and( or(...days) ) )
                break;
            case 'settings.userViewType' :
                constraints.push(
                    where( name, '==', parseInt(value) )
                )
                break;
            default :
                constraints.push(
                    where( name, '==', Boolean(parseInt(value)) )
                )
        }
    })
    /**
     * `query(query, where(...), or(...))
     * `query(query, and(where(...), or(...)))`.
     */
    const bounds = geofire.geohashQueryBounds(centerArray, radiusInM);
    const promises = [];
    for (const b of bounds) {
        const q = query(
            collection(db, 'profiles'),
            and(
            ...constraints,
            // ...constraints.map(processConstraints),
            
            ),
            orderBy('geohash'),
            startAt(b[0]),
            endAt(b[1])
            //...constraints
        );
        const profile = await getDocs(q)
        delete profile.email
        promises.push(profile);
    }
    const snapshots = await Promise.all(promises);
    const matchingDocs = [];
    for (const snap of snapshots) {
        for (const doc of snap.docs) {
            const profile = doc.data()
            
            // If postConstraints exist, check against
            // if ( postConstraints.length && !shouldInclude(profile) ) continue;

            // if ( filter && !filter(profile) ) continue;

            // We have to filter out a few false positives due to GeoHash
            // accuracy, but most will match
            const lat = profile.geoPoint._lat;
            const lng = profile.geoPoint._long;
            const distanceInKm = geofire.distanceBetween([lat, lng], centerArray);
            const distanceInM = distanceInKm * 1000;
            if (distanceInM <= radiusInM) {
                matchingDocs.push(profile);
            }
        }
    }
    return matchingDocs;
}

/* const DW_PURCHASE_TYPE = {WEB: 'web', GOOGLE: 'google', APPLE: 'apple'};
const verifyInAppPurchase = async (type, recipt, transactionId) => {
    return new Promise(async (resolve, reject) => {
        switch(type) {
            case DW_PURCHASE_TYPE.WEB :
                // Check if transactionId is valid somehow
                const valid = true;
                if (valid) {
                    resolve({valid, message: 'Valid transactionId'});
                } else {
                    reject({valid, message: 'Invalid transactionId'});
                }
                break;
            case DW_PURCHASE_TYPE.GOOGLE :
            case DW_PURCHASE_TYPE.APPLE :
                const path = 'https://hire-8d535.firebaseapp.com/verifyInAppPurchase';
                fetch(path, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({type, recipt, transactionId})
                }).then(async res=>{
                    resolve(await res.json());
                }).catch(err=>{
                    reject(err);
                });
                break;
            default :
                return reject('Invalid type');
        }
    })
} */

/* const createStripePaymentIntent = async () => {
    return new Promise(async (resolve, reject) => {
        const currentUID = auth?.currentUser?.uid;
        if (!currentUID) return reject('User not authenticated');
        const userURL = window.location.protocol + '//' + window.location.host + "/user";
        const sessionRef = await addDoc(
            collection(defaultDB, 'customers', currentUID, 'checkout_sessions'), {
                price: "price_1PdwtnLBuQpVAUgdUA3hHIeQ", // Example price in cents
                success_url: userURL,
                cancel_url: userURL,
                mode: "payment",
                //allow_promotion_codes: true,
            }
        );
        const unsubscribe = onSnapshot(doc(defaultDB, sessionRef.path), snap=>{
            const data = snap.data();
            if ( !data?.sessionId ) return;
            resolve( data );
            unsubscribe();
        }, err=>{
            reject(err);
        });
    })
} */

export const DayworkerContext = React.createContext({
    user: undefined,
    setUser: async (user) => null,
    userLoading: true,
    firebaseApp: app,
    auth,
    signOut,
    signIn,
    signUp,
    sendUpdatePasswordEmail,
    updateProfile,
    processAuthError,
    checkTranslated,
    constants: undefined,
    utils,
    getConstants,
    getAuthenticatedUserProfile: async () => null,
    getJobsInArea,
    geolocateProfiles,
    updateProfileImage,
});

export const useDayworker = () => useContext( DayworkerContext );

export const DayworkerProvider = ({ children }) => {
    const [user, setUser] = useState( undefined );
    const [constants, setConstants] = useState( undefined );
    const getAuthenticatedUserProfile = useCallback(async () => {
        if ( !user ) return null;
        if ( cache.has('profile') ) {
            return cache.get('profile');
        }
        const q = query(collection(db, 'profiles'), where('uid', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const documents = [];
        querySnapshot.forEach((doc) => {
            documents.push( doc.data() );
        })
        const profile =  documents.length == 1 ? documents[0] : documents;
        cache.set('profile', profile);
        //if (DEV) console.log('profile', profile)
        return profile;
    }, [user])
    const API = useMemo(()=>({
        user,
        setUser,
        firebaseApp: app,
        auth,
        signOut,
        signIn,
        signUp,
        sendUpdatePasswordEmail,
        updateProfile,
        processAuthError,
        checkTranslated,
        constants,
        utils,
        getConstants,
        getAuthenticatedUserProfile,
        getJobsInArea,
        geolocateProfiles,
        updateProfileImage,
    }), [constants, getAuthenticatedUserProfile, user]);
    useEffect(()=>{
        auth.onAuthStateChanged(u => setUser(current=>u));
        API.getConstants([
            'badges', 'bizFocus', 'regions', 'skillLevel', 'trades', 'settings'
        ]).then(c=>setConstants(current=>c));
    }, [API]);
    return React.createElement(DayworkerContext.Provider, {value: API}, children);
    // return <DayworkerContext.Provider value={API}>{children}</DayworkerContext.Provider>
}