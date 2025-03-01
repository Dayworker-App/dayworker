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
    useContext, useEffect, useMemo, useState
} from 'react';

/*
// Web

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
 
*/

import * as geofire from 'geofire-common';

import * as utils from './utils';
export { utils };

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

const cache = new Map();

export const DayworkerContext = React.createContext({
    user: undefined,
    setUser: async (user) => null,
    constants: undefined,

    userLoading: true,
    firebaseApp: undefined, //app,
    auth: undefined, //auth,

    signOut: async () => null,
    signIn: async (email, password) => null,
    signUp: async (email, password, input, userType, lang) => null,
    sendUpdatePasswordEmail: async (email) => null,
    updateProfile: async (data) => null,
    getConstants: async (docs) => null,
    getAuthenticatedUserProfile: async () => null,
    getJobsInArea: async (area, onComplete) => null,
    geolocateProfiles: async (center, radiusInM, queryParams) => null,
    updateProfileImage: async (uid, base64) => null,
    emailUser: async (emails, message, vars) => null,
    googleMapsGeolocate: async (address) => null,
    uploadFileBase64: async (base64, path, format) => null,
    getFileURL: async (name) => null
});

export const useDayworker = () => useContext( DayworkerContext );

export const DayworkerProvider = ({ children, firebase }) => {
    const [user, setUser] = useState( undefined );
    const [constants, setConstants] = useState( undefined );

    const app = !firebase.app.getApps().length ? firebase.app.initializeApp(firebaseConfig) : firebase.app.getApps()[0];
    const auth = firebase.auth.getAuth(app);

    const db = firebase.store.getFirestore(app, env);
    const defaultDB = env != '(default)' ? firebase.store.getFirestore(app, '(default)') : db;

    const API = useMemo(()=>({
        user,
        setUser,
        constants,

        firebaseApp: app,
        auth: auth,
        
        signIn: async (email, password) => {
            return firebase.auth.signInWithEmailAndPassword(
                auth, 
                email.toLowerCase().trim(), 
                password.trim()
            );
        },
        signOut: async () => auth.signOut(),
        signUp: async (email, password, input, userType, lang) => {
            email = email.trim().toLowerCase();
            password = password.trim();
            return new Promise(async (resolve, reject) => {
                // Validate cred and input
                if (utils.invalidateSignUpCredentials(email, password, reject)) return;
                if (utils.invalidateSignUpInput(input, reject)) return;
                if ( input.zip ) {
                    const { geoPoint, geohash } = await API.googleMapsGeolocate(input.zip);
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
                    user = await firebase.auth.createUserWithEmailAndPassword(
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
                const profilesRef = firebase.store.collection(db, 'profiles');
                const templateName = `join-${userType.toLowerCase()}`;
                const templateLang = lang.toUpperCase();
                firebase.store.setDoc( firebase.store.doc(profilesRef, UID), input, { merge: true }).then((res)=>{
                    console.log(res);
                    // Send Welcome Email
                    API.emailUser(email, `email--${templateName}--${templateLang}`, {
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
        },
        sendUpdatePasswordEmail: async (email) => {
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
            return firebase.auth.sendPasswordResetEmail(auth, emailClean, actionCodeSettings);
        },
        updateProfile: async data => {
            return new Promise(async (resolve, reject) => {
                const UID = auth.currentUser?.uid
                const profilesRef = firebase.store.collection(db, 'profiles');
                const profileRef = firebase.store.doc(profilesRef, UID);
                const profile = await firebase.store.getDoc( profileRef );
                if (!profile.exists()) return reject(`Profile ${UID} doesn't exist.`);
                if (typeof data.zip === 'number') {
                    const { geoPoint, geohash } = await API.googleMapsGeolocate(data.zip);
                    data.geoPoint = geoPoint;
                    data.geohash = geohash;
                }
                firebase.store.setDoc( profileRef, data, { merge: true }).then(()=>{
                    resolve(data);
                }).catch(err=>{
                    reject(err)
                });
            })
        },
        getConstants: async (docs) => {
            // const DEV = process.env.NODE_ENV == 'development'
            if ( cache.has('constants') ) {
                //if (DEV) console.log('cached constants loaded');
                return cache.get('constants');
            }
            const q = firebase.store.query(firebase.store.collection(db, 'constants'), firebase.store.where('__name__', 'in', docs));
            const querySnapshot = await firebase.store.getDocs(q);
            const documents = [];
            querySnapshot.forEach((d) => {
                documents.push( d.data() );
            })
            const _const = {}
            documents.forEach(({name, map})=>_const[name] = map);
            cache.set('constants', _const);
            return _const;
        },
        getAuthenticatedUserProfile: async () => {
            if ( !user ) return null;
            if ( cache.has('profile') ) {
                return cache.get('profile');
            }
            const q = firebase.store.query(firebase.store.collection(db, 'profiles'), firebase.store.where('uid', '==', user.uid));
            const querySnapshot = await firebase.store.getDocs(q);
            const documents = [];
            querySnapshot.forEach((d) => {
                documents.push( d.data() );
            })
            const profile =  documents.length == 1 ? documents[0] : documents;
            cache.set('profile', profile);
            //if (DEV) console.log('profile', profile)
            return profile;
        },
        getJobsInArea: async (area, onComplete) => {
            const q = firebase.store.query(firebase.store.collection(db, 'Worker Requests'), firebase.store.where('area', '==', area));
            const querySnapshot = await firebase.store.getDocs(q);
            const jobs = [];
            querySnapshot.forEach((d) => {
                jobs.push( d.data() );
            });
            onComplete({success: true, data: jobs});
        },
        geolocateProfiles: async (center, radiusInM, queryParams) => {
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
                           firebase.store.where('trades', 'array-contains', parseInt(v))
                        ))
                        constraints.push( firebase.store.and( firebase.store.or(...trades) ) )
                        break;
                    case 'availableWeekdays' :
                        const days = []
                        value.split(',').map(v=>days.push(
                           firebase.store.where(`${name}.${v}`, '==', true)
                        ))
                        constraints.push( firebase.store.and( firebase.store.or(...days) ) )
                        break;
                    case 'settings.userViewType' :
                        constraints.push(
                           firebase.store.where( name, '==', parseInt(value) )
                        )
                        break;
                    default :
                        constraints.push(
                           firebase.store.where( name, '==', Boolean(parseInt(value)) )
                        )
                }
            })
            const bounds = geofire.geohashQueryBounds(centerArray, radiusInM);
            const promises = [];
            for (const b of bounds) {
                const q = firebase.store.query(
                    firebase.store.collection(db, 'profiles'),
                    firebase.store.and(
                    ...constraints,
                    // ...constraints.map(processConstraints),
                    ),
                    firebase.store.orderBy('geohash'),
                    firebase.store.startAt(b[0]),
                    firebase.store.endAt(b[1])
                    //...constraints
                );
                const profile = await firebase.store.getDocs(q)
                delete profile.email
                promises.push(profile);
            }
            const snapshots = await Promise.all(promises);
            const matchingDocs = [];
            for (const snap of snapshots) {
                for (const d of snap.docs) {
                    const profile = d.data()
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
        },
        updateProfileImage: async (uid, base64) => {
            // Check if uid exists
            const path = `${uid}/profileImage`;
            return new Promise((resolve, reject) => {
                API.uploadFileBase64(base64, path).then(async (res)=>{
                    const url = await API.getFileURL(path);
                    API.updateProfile({profileImage: url}).then(()=>{
                        resolve(url);
                    }).catch(err=>{
                        reject(err);
                    });
                }).catch(err=>{
                    reject(err);
                });
            });
        },
        emailUser: async (emails, message, vars) => {
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
                    text: message.text || utils.stripHTML(message.html),
                    html: message.html || message.text
                }
                if (data.template && !data.template.name)
                    return reject("No email message");
                if (data.message && (!data.message.text || !data.message.html))
                    return reject("No email message");
                data.currentUID = auth?.currentUser?.uid;
                data.timestamp =  firebase.store.serverTimestamp() // Timestamp.now(); // new Date().getTime();
                const mailRef = firebase.store.collection(defaultDB, 'mail');
                const emailDoc = firebase.store.doc(mailRef);
                firebase.store.setDoc(emailDoc, data, { merge: true }).then(()=>{
                    resolve('Email sent');
                }).catch((err)=>{
                    reject("Email not sent: " + JSON.stringify(err));
                });
            })
        },
        googleMapsGeolocate: async (address) => {
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
            if (lat && lng) response.geoPoint = new firebase.store.GeoPoint(lat, lng);
            if (response.geoPoint)
                response.geohash = geofire.geohashForLocation([
                    response.geoPoint._lat || response.geoPoint._latitude,
                    response.geoPoint._long || response.geoPoint._longitude
                ]);
            return response;
        },
        uploadFileBase64: async (base64, path, format) => {
            format = format || 'data_url'; // 'base64' | 'base64url' | 'data_url'
            const storageRef = firebase.storage.ref(storage, path);
            return firebase.storage.uploadString(storageRef, base64, format);
        },
        getFileURL: async (name) => {
            const url = await firebase.storage.getDownloadURL(firebase.storage.ref(storage, name))
            return url;
        }
    }), [constants, user]);
    useEffect(()=>{
        auth.onAuthStateChanged(u => setUser(()=>u));
        API.getConstants([
            'badges', 'bizFocus', 'regions', 'skillLevel', 'trades', 'settings', 'privacyVersion', 'termsVersion'
        ]).then(c=>setConstants(()=>c));
    }, [API]);
    // return React.createElement(DayworkerContext.Provider, {value: API}, [...children]);
    return <DayworkerContext.Provider value={API}>{children}</DayworkerContext.Provider>
}