/**

// Context Provider Useage:

import { DayworkerContext, dayworkerProvider } from 'dayworker';
const DayworkerProvider = ({children}) => {
    const value = dayworkerProvider();
    return <DayworkerContext.Provider value={value}>{children}</DayworkerContext.Provider>
}

<DayworkerProvider>{children}</DayworkerProvider>

*/

import React, { useContext, useEffect, useMemo, useState } from 'react';

import * as geofire from 'geofire-common';
// import { FieldValue, Filter, GeoPoint } from '@react-native-firebase/firestore';

import * as utils from './utils';
export { utils };

// import useFirebaseAnalytics from './analytics/providers/firebase/useFirebaseAnalytics';
import FirebaseAnalyticsService from './analytics/providers/firebase/firebaseAnalyticsService';

// let env = process.env.NODE_ENV;
// if (env === 'production') env = '(default)';
// if (env === 'production') {
//   env = 'development';
// }

const googleMapsConfig = {
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
};

const cache = new Map();

export const DayworkerContext = React.createContext({
  user: undefined,
  analytics: {},
  setUser: async user => null,
  constants: undefined,

  userLoading: true,
  firebaseApp: undefined, //app,
  auth: undefined, //auth,

  signOut: async () => null,
  signInWithPhoneNumber: async phoneNumber => null,
  signInWithEmailAndPassword: async (email, password) => null,
  signUp: async (email, password, input, userType, lang) => null,
  sendUpdatePasswordEmail: async email => null,
  updateProfile: async data => null,
  getUserProfileById: async userId => null,
  getConstants: async docs => null,
  getAuthenticatedUserProfile: async () => null,
  getJobsInArea: async (area, onComplete) => null,
  geolocateProfiles: async (center, radiusInM, queryParams) => null,
  updateProfileImage: async (uid, base64) => null,
  emailUser: async (emails, message, vars) => null,
  googleMapsGeolocate: async address => null,
  uploadFileBase64: async (base64, path, format) => null,
  getFileURL: async name => null,
  uploadResume: async (uid, base64, callbacks) => url,
  deleteResume: async uid => null,
  deleteAccount: async () => null,
  sendForgotPasswordEmail: async email => null,
  verifyPhoneNumber: async phone => null,
  updatePhoneNumber: async (verificationId, code) => null,
  linkPhoneNumber: async (verificationId, code) => null,
  updateUserAuthEmail: async email => null,
  reauthenticateUserWithEmailAndPassword: (email, password) => null,
  reauthenticateUserWithPhoneNumber: async (verificationId, code) => null,
});

export const useDayworker = () => useContext(DayworkerContext);

export const DayworkerProvider = ({ children, firebase }) => {
  // START FIREBASE SETUP
  const { app } = firebase;
  const {
    createUserWithEmailAndPassword,
    deleteUser,
    EmailAuthProvider,
    getAuth,
    linkWithCredential,
    onAuthStateChanged,
    PhoneAuthProvider,
    reauthenticateWithCredential,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPhoneNumber,
    signOut,
    unlink,
    updatePhoneNumber,
    verifyPhoneNumber,
  } = firebase.auth;
  const auth = getAuth(app);

  const {
    collection,
    deleteDoc,
    doc,
    endAt,
    FieldValue,
    Filter,
    GeoPoint,
    getDoc,
    getDocs,
    getFirestore,
    orderBy,
    query,
    setDoc,
    startAt,
    updateDoc,
    where,
  } = firebase.store;
  // console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);
  const db = getFirestore(app, process.env.NODE_ENV);
  const defaultDb = getFirestore(app);

  const { getStorage, ref, uploadBytesResumable, getDownloadURL } =
    firebase.storage;
  const storage = getStorage(app);

  const firebaseAnalytics = useMemo(() => {
    const fbAnalytics = new FirebaseAnalyticsService(firebase.analytics);
    // Singleton trick. Remove constructor to prevent object creating.
    fbAnalytics.constructor = null;
    return fbAnalytics;
  }, [firebase.analytics]);

  // END FIREBASE SETUP

  const [user, setUser] = useState(undefined);
  const [constants, setConstants] = useState(undefined);

  const API = useMemo(
    () => ({
      user,
      setUser,
      constants,

      firebaseApp: app,
      auth: auth,
      analytics: firebaseAnalytics,

      signInWithEmailAndPassword: async (email, password) => {
        return new Promise(async (resolve, reject) => {
          await signInWithEmailAndPassword(
            auth,
            email.toLowerCase().trim(),
            password.trim(),
          )
            .then(res => resolve(res))
            .catch(error => reject(error));
        });
      },
      signInWithPhoneNumber: async phoneNumber => {
        return new Promise(async (resolve, reject) => {
          await signInWithPhoneNumber(auth, phoneNumber.trim())
            .then(confirmation => resolve(confirmation))
            .catch(error => reject(error));
        });
      },
      verifyPhoneNumber: async phoneNumber => {
        return new Promise(async (resolve, reject) => {
          await verifyPhoneNumber(auth, phoneNumber.trim())
            .then(confirmation => resolve(confirmation))
            .catch(error => reject(error));
        });
      },
      verifyEmailAddress: async () => {
        return new Promise(async (resolve, reject) => {
          await sendEmailVerification(auth.currentUser)
            .then(confirmation => resolve(confirmation))
            .catch(error => reject(error));
        });
      },
      updatePhoneNumber: async (verificationId, code) => {
        return new Promise(async (resolve, reject) => {
          const credential = PhoneAuthProvider.credential(
            verificationId,
            code.trim(),
          );
          await updatePhoneNumber(auth.currentUser, credential)
            .then(async () => {
              await auth.currentUser?.reload();
              setUser(() => auth.currentUser);
              resolve(auth.currentUser);
            })
            .catch(error => reject(error));
        });
      },
      linkPhoneNumber: async (verificationId, code) => {
        return new Promise(async (resolve, reject) => {
          const credential = PhoneAuthProvider.credential(
            verificationId,
            code.trim(),
          );
          await linkWithCredential(auth.currentUser, credential)
            .then(userData => {
              setUser(userData.user);
              resolve(userData);
            })
            .catch(error => reject(error));
        });
      },
      linkEmailAddress: async (email, password) => {
        return new Promise(async (resolve, reject) => {
          const credential = EmailAuthProvider.credential(
            email.trim() || auth.currentUser.email,
            password,
          );
          await linkWithCredential(auth.currentUser, credential)
            .then(userData => {
              setUser(userData.user);
              resolve(userData);
            })
            .catch(error => reject(error));
        });
      },
      reauthenticateUserWithPhoneNumber: async (verificationId, code) => {
        return new Promise(async (resolve, reject) => {
          const credential = PhoneAuthProvider.credential(
            verificationId,
            code.trim(),
          );
          await reauthenticateWithCredential(auth.currentUser, credential)
            .then(() => resolve())
            .catch(error => reject(error));
        });
      },
      reauthenticateUserWithEmailAndPassword: async (email, password) => {
        return new Promise(async (resolve, reject) => {
          const credential = EmailAuthProvider.credential(
            email.trim() || auth.currentUser?.email,
            password,
          );
          await reauthenticateWithCredential(auth.currentUser, credential)
            .then(res => resolve(res))
            .catch(error => reject(error));
        });
      },
      unlinkAuthProvider: async providerId => {
        return new Promise(async (resolve, reject) => {
          await unlink(auth.currentUser, providerId)
            .then(userData => {
              setUser(userData);
              resolve(userData);
            })
            .catch(error => reject(error));
        });
      },
      sendUpdatePasswordEmail: async email => {
        const emailClean = email.trim().toLowerCase();
        let query = new URLSearchParams({ email: emailClean });
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
          handleCodeInApp: true,
        };
        return sendPasswordResetEmail(auth, emailClean, actionCodeSettings);
      },
      updateUserAuthEmail: async newEmail => {
        return new Promise(async (resolve, reject) => {
          return await updateEmail(auth.currentUser, newEmail)
            .then(async () => {
              await auth.currentUser?.reload();
              setUser(() => auth.currentUser);
              resolve(auth.currentUser);
            })
            .catch(error => reject(error));
        });
      },
      signOut: async () => await signOut(auth),
      signUp: async (email, password, input, userType, lang) => {
        email = email.trim().toLowerCase();
        password = password.trim();
        return new Promise(async (resolve, reject) => {
          // Validate cred and input
          if (utils.invalidateSignUpCredentials(email, password, reject)) {
            return;
          }
          // ADD MORE CHECKS HERE - CHECK FOR REQUIRED FIELDS
          if (utils.invalidateSignUpInput(input, reject)) {
            return;
          }
          if (input.zip) {
            const { geoPoint, geohash } = await API.googleMapsGeolocate(
              input.zip,
            );
            if (input.geoPoint === undefined && geoPoint) {
              input.geoPoint = geoPoint;
            }
            if (input.geohash === undefined && geohash) {
              input.geohash = geohash;
            }
            const location = await API.googleMapsReverseGeocode(
              geoPoint.latitude,
              geoPoint.longitude,
            );
            input.region = `${location.city}, ${location.state}`;
          } else {
            if (input.geoPoint === undefined) {
              input.geoPoint = null;
            }
            if (input.geohash === undefined) {
              input.geohash = null;
            }
          }
          // TEST
          //return setTimeout(resolve, 3000, {email, password, input});
          // Register User
          let user;
          try {
            user = await createUserWithEmailAndPassword(
              auth,
              email.trim().toLowerCase(),
              password.trim(),
            );
          } catch (err) {
            reject(err);
          }
          if (!user) {
            return reject('User not created');
          }
          const UID = auth.currentUser?.uid;
          if (!UID) {
            return reject('New UID not authenticated');
          }
          if (input.uid === undefined) {
            input.uid = UID;
          }

          const templateName = `join-${userType.toLowerCase()}`;
          const templateLang = lang.toUpperCase();

          const profileCollectionRef = collection(db, 'profiles');
          const docRef = doc(profileCollectionRef, UID);
          setDoc(docRef, input)
            .then(res => {
              // Send Welcome Email
              API.emailUser(email, `email--${templateName}--${templateLang}`, {
                name: input.name.trim(),
                year: new Date().getFullYear(),
              })
                // .then(message => {
                //   // Send verification email
                //   API.verifyEmailAddress(email);
                // })
                .then(() => resolve(input))
                .catch(console.error);
            })
            .catch(err => {
              console.error(err);
              reject('Profile data not loaded');
            });
        });
      },
      getUserProfileById: async userId => {
        return new Promise(async (resolve, reject) => {
          if (!userId) {
            return reject('No userId provided');
          }
          const profile = await getDoc(collection(db, 'profiles', userId));
          if (!profile.exists) {
            return reject(`Profile ${userId} doesn't exist.`);
          }
          const userProfile = profile.data();
          resolve(userProfile);
        });
      },
      updateProfile: async data => {
        return new Promise(async (resolve, reject) => {
          const UID = auth.currentUser?.uid;
          console.log('updateProfile UID: ', UID);
          const profileRef = doc(db, 'profiles', UID);
          const profile = await getDoc(profileRef);
          console.log('updateProfile profile: ', profile);

          if (!profile.exists) {
            return reject(`Profile ${UID} doesn't exist.`);
          }

          if (data.email) {
            console.log('updateProfile data.email: ', data.email);
            try {
              console.log('Updating user email: ', data.email);
              // Update the auth email
              await API.updateUserAuthEmail(data.email);
              console.log('Update user email COMPLETE ');
            } catch (e) {
              reject(e);
            }
          }

          if (data.zip) {
            const { geoPoint, geohash } = await API.googleMapsGeolocate(
              data.zip,
            );
            data.geoPoint = geoPoint;
            data.geohash = geohash;
            const location = await API.googleMapsReverseGeocode(
              geoPoint.latitude,
              geoPoint.longitude,
            );
            data.region = `${location.city}, ${location.state}`;
          }

          await updateDoc(profileRef, data)
            .then(() => {
              console.log('Profile updated successfully');
              const currentProfile = cache.get('profile');
              const updatedProfile = {
                ...currentProfile,
                ...data,
              };
              cache.set('profile', updatedProfile);
              resolve(updatedProfile);
            })
            .catch(err => {
              reject(err);
            });
        });
      },
      getConstants: async (
        docs = [
          'badges',
          'bizFocus',
          'regions',
          'skillLevel',
          'trades',
          'skills',
          'settings',
          'privacyVersion',
          'termsVersion',
        ],
      ) => {
        // const DEV = process.env.NODE_ENV == 'development'
        if (cache.has('constants')) {
          //if (DEV) console.log('cached constants loaded');
          return cache.get('constants');
        }

        const constantsCollectionRef = collection(db, 'constants');
        const q = query(constantsCollectionRef, where('__name__', 'in', docs));
        const querySnapshot = await getDocs(q);

        const documents = [];
        querySnapshot.forEach(d => {
          if (d.exists) {
            documents.push(d.data());
          }
        });
        const _const = {};
        documents.forEach(({ name, map }) => (_const[name] = map));
        cache.set('constants', _const);
        return _const;
      },
      /**
       * Return the authenticated user's profile.
       * @param noCache - When set to true, will skip using the cache and fetch directly from firebase.
       */
      getAuthenticatedUserProfile: async (noCache = false) => {
        if (!user) {
          return null;
        }
        if (!noCache && cache.has('profile')) {
          return cache.get('profile');
        }

        const profilesRef = collection(db, 'profiles');
        const docRef = doc(profilesRef, user.uid);

        return await getDoc(docRef).then(documentSnapshot => {
          if (documentSnapshot.exists) {
            const userProfile = documentSnapshot.data();
            cache.set('profile', userProfile);
            return userProfile;
          }

          return;
        });
      },
      getJobsInArea: async (area, onComplete) => {
        const workersCollectionRef = collection(db, 'Worker Requests');
        const q = query(workersCollectionRef, where('area', '==', area));
        const querySnapshot = await getDocs(q);

        const jobs = [];
        querySnapshot.forEach(d => {
          jobs.push(d.data());
        });
        onComplete({ success: true, data: jobs });
      },
      geolocateProfiles: async (center, radiusInM, queryParams) => {
        if (!queryParams.has('settings.userViewType')) {
          // console.log('query params do NOT contain userViewType');
          queryParams.append('settings.userViewType', 1);
        }
        const centerArray = Array.isArray(center)
          ? center
          : [center._latitude, center._longitude];
        radiusInM = radiusInM || 50 * 1000;

        const constraints = [];

        queryParams.delete('geoPoint');
        queryParams.delete('zoom');

        const searchParams = Object.fromEntries([...queryParams.entries()]);
        // console.log(
        //   'SDK searchParams: ',
        //   JSON.stringify(searchParams, null, 2),
        // );

        Object.keys(searchParams).forEach(key => {
          const availableWeekdays = [];

          if (searchParams[key]) {
            if (key === 'skills') {
              const skillsArray = searchParams[key]
                .split(',')
                .map(s => parseInt(s, 10));

              constraints.push(
                Filter('trades', 'array-contains-any', skillsArray),
              );
            }
            if (key === 'bizFocus') {
              const bizFocusArray = searchParams[key]
                .split(',')
                .map(s => parseInt(s, 10));

              constraints.push(
                Filter(
                  'contractorData.bizFocus',
                  'array-contains-any',
                  bizFocusArray,
                ),
              );
            }
            if (key === 'availableWeekdays') {
              const days = searchParams[key].split(',');
              availableWeekdays.length = 0;
              days.forEach(day => {
                availableWeekdays.push(
                  Filter(`availableWeekdays.${day}`, '==', true),
                );
                // constraints.push(
                //   Filter(`availableWeekdays.${day}`, '==', true),
                // );
              });
            }
            if (key === 'settings.userViewType') {
              constraints.push(
                Filter(key, '==', parseInt(searchParams[key], 10)),
              );
            }
          }
          if (availableWeekdays.length) {
            constraints.push(Filter.or(...availableWeekdays));
          }
        });

        const bounds = geofire.geohashQueryBounds(centerArray, radiusInM);
        const promises = [];
        // console.log('bounds: ', bounds);
        for (const b of bounds) {
          const profilesRef = collection(db, 'profiles'); //
          const q = query(
            profilesRef, //
            where(
              constraints.length > 1
                ? Filter.and(...constraints) // Use 'and' for multiple constraints
                : constraints[0], // If only one constraint, use it directly
            ),
            orderBy('geohash'), // Order by 'geohash'
            startAt(b[0]), // Define the start point
            endAt(b[1]), // Define the end point
          );

          promises.push(getDocs(q));
        }
        const snapshots = await Promise.all(promises);
        const matchingDocs = [];

        for (const snap of snapshots) {
          if (snap.size) {
            for (const d of snap.docs) {
              const profile = d.data();

              const testAccountEmails = [
                'test.worker@dayworker.co',
                'test.contractor@dayworker.co',
              ];
              if (!testAccountEmails.includes(profile.email)) {
                // console.log('profile: ', JSON.stringify(profile, null, 2));
                // If postConstraints exist, check against
                // if ( postConstraints.length && !shouldInclude(profile) ) continue;
                // if ( filter && !filter(profile) ) continue;
                // We have to filter out a few false positives due to GeoHash
                // accuracy, but most will match
                // const lat = profile.geoPoint._lat;
                // const lng = profile.geoPoint._long;

                const lat = profile.geoPoint.latitude;
                const lng = profile.geoPoint.longitude;
                const distanceInKm = geofire.distanceBetween(
                  [lat, lng],
                  centerArray,
                );
                const distanceInM = distanceInKm * 1000;

                if (distanceInM <= radiusInM) {
                  matchingDocs.push(profile);
                }
              }
            }
          }
        }
        return matchingDocs;
      },
      updateProfileImage: async (uid, base64, callbacks) => {
        // Check if uid exists
        const path = `${uid}/profileImage`;

        return new Promise((resolve, reject) => {
          API.uploadFileBase64(base64, path, null, callbacks)
            .then(async res => {
              const url = await API.getFileURL(path);
              API.updateProfile({ profileImage: url })
                .then(() => {
                  resolve(url);
                })
                .catch(err => {
                  reject(err);
                });
            })
            .catch(err => {
              reject(err);
            });
        });
      },
      uploadResume: async (uid, base64, callbacks) => {
        // Check if uid exists
        const path = `${uid}/resume`;

        return new Promise((resolve, reject) => {
          API.uploadFileBase64(base64, path, null, callbacks)
            .then(async res => {
              const url = await API.getFileURL(path);
              API.updateProfile({ resume: url })
                .then(() => {
                  resolve(url);
                })
                .catch(err => {
                  reject(err);
                });
            })
            .catch(err => {
              reject(err);
            });
        });
      },
      deleteResume: async uid => {
        const path = `${uid}/resume`;
        const resumeRef = ref(storage, path);
        await resumeRef.delete();
        return new Promise((resolve, reject) => {
          API.updateProfile({ resume: null })
            .then(() => {
              resolve({ success: true });
            })
            .catch(err => {
              reject(err);
            });
        });
      },
      emailUser: async (emails, message, vars) => {
        emails = emails || [];
        message = message || {};
        vars = vars || {};
        return new Promise(async (resolve, reject) => {
          const data = {
            to: Array.isArray(emails) ? emails : [emails],
          };
          if (!data.to.length) {
            return reject('No email recipients');
          }
          if (typeof message === 'string') {
            data.template = {
              name: message,
              data: vars,
            };
          } else if (message.html || message.text) {
            data.message = {
              subject: message.subject || '(No Subject)',
              text: message.text || utils.stripHTML(message.html),
              html: message.html || message.text,
            };
          }
          if (data.template && !data.template.name) {
            return reject('No email message');
          }
          if (data.message && (!data.message.text || !data.message.html)) {
            return reject('No email message');
          }
          data.currentUID = auth?.currentUser?.uid;
          data.timestamp = FieldValue.serverTimestamp(); // store.serverTimestamp(); // Timestamp.now(); // new Date().getTime();

          const mailRef = collection(defaultDb, 'mail');
          const emailDoc = doc(mailRef, data.currentUID);

          await setDoc(emailDoc, data)
            .then(() => {
              console.log('Email sent');
              resolve('Email sent');
            })
            .catch(err => {
              reject('Email not sent: ' + err.message);
            });
        });
      },
      googleMapsReverseGeocode: async (lat, lng) => {
        // TODO: merge this with googleMapsGeolocate by passing query params or string as argument
        const key = googleMapsConfig.apiKey;
        const q = new URLSearchParams({
          latlng: [lat, lng].join(','),
          key,
        }).toString();
        const res = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?${q}`,
        );
        const data = await res.json();
        let response = { city: null, state: null };
        if (data.results.length) {
          for (let component of data.results[0]?.address_components) {
            if (component.types.indexOf('locality') > -1) {
              response.city = component.long_name;
            } else if (component.types.indexOf('sublocality') > -1) {
              response.city = component.long_name;
            } else if (component.types.indexOf('neighborhood') > -1) {
              response.city = component.long_name;
            }
            if (component.types.indexOf('administrative_area_level_1') > -1) {
              response.state = component.short_name;
            }
          }
        }

        return response;
      },
      googleMapsGeolocate: async address => {
        const key = googleMapsConfig.apiKey;
        const q = new URLSearchParams({ address, key }).toString();
        const res = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?${q}`,
        );
        const data = await res.json();
        // console.log('data: ', data);

        const response = { geoPoint: null, geohash: null };
        if (data.results.length) {
          for (let component of data.results[0]?.address_components) {
            if (component.types.indexOf('postal_code') > -1) {
              response.zipcode = parseInt(component.long_name);
            }
          }
        }
        const { lat, lng } = data.results[0].geometry.location;
        if (lat && lng) {
          response.geoPoint = new GeoPoint(lat, lng);
        }
        if (response.geoPoint) {
          response.geohash = geofire.geohashForLocation([
            response.geoPoint._lat || response.geoPoint._latitude,
            response.geoPoint._long || response.geoPoint._longitude,
          ]);
        }
        return response;
      },
      uploadFileBase64: async (
        base64,
        path,
        format = 'data_url',
        callbacks,
      ) => {
        // format = format || 'data_url'; // 'base64' | 'base64url' | 'data_url'
        // const storageRef = storage.ref(path);
        // const task = storage.ref(path).putFile(base64);
        const fileRef = ref(storage, path);
        const task = uploadBytesResumable(fileRef, base64);

        task.on('state_changed', taskSnapshot => {
          // console.log(
          //   `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
          // );
          callbacks?.onUploadProgress?.({
            progress:
              (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100,
          });
        });

        return task
          .then(() => {
            // console.log('Image uploaded to the bucket!');
            callbacks?.onSuccess?.(task);
            return task;
          })
          .catch(e => {
            console.error('upload file error: ', e.message);
            callbacks?.onError?.(e);
          });
      },
      getFileURL: async name => {
        const fileRef = ref(storage, name);
        const url = await getDownloadURL(fileRef);
        return url;
      },
      deleteAccount: async () => {
        return new Promise(async (resolve, reject) => {
          try {
            // We may want to delete more content. I.e. nudges, favorites, etc.
            const UID = auth.currentUser?.uid;
            const profileRef = collection(db, 'profiles');
            const docRef = doc(profileRef, UID);

            return deleteDoc(docRef)
              .then(() => {
                return deleteUser(auth.currentUser);
                // return auth.currentUser?.delete?.();
              })
              .then(() => {
                return resolve(true);
              })
              .catch(error => {
                reject(error);
              });
          } catch (error) {
            reject(error);
          }
        });
      },
      sendForgotPasswordEmail: async email => {
        return await sendPasswordResetEmail(auth, email);
      },
    }),
    [
      EmailAuthProvider,
      FieldValue,
      Filter,
      GeoPoint,
      PhoneAuthProvider,
      app,
      auth,
      collection,
      constants,
      createUserWithEmailAndPassword,
      db,
      defaultDb,
      deleteDoc,
      deleteUser,
      doc,
      endAt,
      firebaseAnalytics,
      getDoc,
      getDocs,
      getDownloadURL,
      linkWithCredential,
      orderBy,
      query,
      reauthenticateWithCredential,
      ref,
      sendPasswordResetEmail,
      setDoc,
      signInWithEmailAndPassword,
      signInWithPhoneNumber,
      signOut,
      startAt,
      storage,
      unlink,
      updateDoc,
      updatePhoneNumber,
      uploadBytesResumable,
      user,
      verifyPhoneNumber,
      where,
    ],
  );
  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, u => {
      // console.log('Auth State Changed: ', JSON.stringify(u || {}, null, 2));
      setUser(() => u);
      if (!u) {
        cache.clear();
      }
    });
    API.getConstants([
      'badges',
      'bizFocus',
      'regions',
      'skillLevel',
      'trades',
      'skills',
      'settings',
      'privacyVersion',
      'termsVersion',
    ]).then(c => setConstants(() => c));
    return subscriber; // unsubscribe on unmount
  }, [API, auth, onAuthStateChanged]);
  // return React.createElement(DayworkerContext.Provider, {value: API}, [...children]);
  return (
    <DayworkerContext.Provider value={API}>
      {children}
    </DayworkerContext.Provider>
  );
};
