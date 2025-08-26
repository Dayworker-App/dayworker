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

import * as utils from './utils';
export { utils };

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
  uploadFileUri: async (fileUri, path, callbacks) => null,
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
  const auth = firebase.auth.getAuth(firebase.app);
  // const db = firebase.store.getFirestore(firebase.app, 'production');
  const db = firebase.store.getFirestore(firebase.app, process.env.NODE_ENV);
  const defaultDb = firebase.store.getFirestore(firebase.app);
  const storage = firebase.storage.getStorage(firebase.app);

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

      firebaseApp: firebase.app,
      auth: auth,
      analytics: firebaseAnalytics,

      signInWithEmailAndPassword: async (email, password) => {
        return new Promise(async (resolve, reject) => {
          await firebase.auth
            .signInWithEmailAndPassword(
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
          await firebase.auth
            .signInWithPhoneNumber(auth, phoneNumber.trim())
            .then(confirmation => resolve(confirmation))
            .catch(error => reject(error));
        });
      },
      verifyPhoneNumber: async phoneNumber => {
        return new Promise(async (resolve, reject) => {
          await firebase.auth
            .verifyPhoneNumber(auth, phoneNumber.trim())
            .then(confirmation => resolve(confirmation))
            .catch(error => reject(error));
        });
      },
      verifyEmailAddress: async () => {
        return new Promise(async (resolve, reject) => {
          await firebase.auth
            .sendEmailVerification(auth.currentUser)
            .then(confirmation => resolve(confirmation))
            .catch(error => reject(error));
        });
      },
      updatePhoneNumber: async (verificationId, code) => {
        return new Promise(async (resolve, reject) => {
          const credential = firebase.auth.PhoneAuthProvider.credential(
            verificationId,
            code.trim(),
          );
          await firebase.auth
            .updatePhoneNumber(auth.currentUser, credential)
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
          const credential = firebase.auth.PhoneAuthProvider.credential(
            verificationId,
            code.trim(),
          );
          await firebase.auth
            .linkWithCredential(auth.currentUser, credential)
            .then(userData => {
              setUser(userData.user);
              resolve(userData);
            })
            .catch(error => reject(error));
        });
      },
      linkEmailAddress: async (email, password) => {
        return new Promise(async (resolve, reject) => {
          const credential = firebase.auth.EmailAuthProvider.credential(
            email.trim() || auth.currentUser.email,
            password,
          );
          await firebase.auth
            .linkWithCredential(auth.currentUser, credential)
            .then(userData => {
              setUser(userData.user);
              resolve(userData);
            })
            .catch(error => reject(error));
        });
      },
      reauthenticateUserWithPhoneNumber: async (verificationId, code) => {
        return new Promise(async (resolve, reject) => {
          const credential = firebase.auth.PhoneAuthProvider.credential(
            verificationId,
            code.trim(),
          );
          await firebase.auth
            .reauthenticateWithCredential(auth.currentUser, credential)
            .then(() => resolve())
            .catch(error => reject(error));
        });
      },
      reauthenticateUserWithEmailAndPassword: async (email, password) => {
        return new Promise(async (resolve, reject) => {
          const credential = firebase.auth.EmailAuthProvider.credential(
            email.trim() || auth.currentUser?.email,
            password,
          );
          await firebase.auth
            .reauthenticateWithCredential(auth.currentUser, credential)
            .then(res => resolve(res))
            .catch(error => reject(error));
        });
      },
      unlinkAuthProvider: async providerId => {
        return new Promise(async (resolve, reject) => {
          await firebase.auth
            .unlink(auth.currentUser, providerId)
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
        return firebase.auth.sendPasswordResetEmail(
          auth,
          emailClean,
          actionCodeSettings,
        );
      },
      updateUserAuthEmail: async newEmail => {
        return new Promise(async (resolve, reject) => {
          await firebase.auth
            .updateEmail(auth.currentUser, newEmail)
            .then(async () => {
              return auth.currentUser?.reload?.();
            })
            .then(() => {
              setUser(() => auth.currentUser);
              resolve(auth.currentUser);
            })
            .catch(error => {
              reject(error);
            });
        });
      },
      signOut: async () => await firebase.auth.signOut(auth),
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
            user = await firebase.auth.createUserWithEmailAndPassword(
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

          const profileCollectionRef = firebase.store.collection(
            db,
            'profiles',
          );
          const docRef = firebase.store.doc(profileCollectionRef, UID);
          firebase.store
            .setDoc(docRef, input)
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
          const profileDoc = firebase.store.doc(db, 'profiles', userId);
          const profile = await firebase.store.getDoc(profileDoc);
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
          const profileRef = firebase.store.doc(db, 'profiles', UID);
          const profile = await firebase.store.getDoc(profileRef);

          if (!profile.exists) {
            return reject(`Profile ${UID} doesn't exist.`);
          }

          if (data.email) {
            try {
              // Update the auth email
              await API.updateUserAuthEmail(data.email);
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

          await firebase.store
            .updateDoc(profileRef, data)
            .then(() => {
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

        const constantsCollectionRef = firebase.store.collection(
          db,
          'constants',
        );
        const q = firebase.store.query(
          constantsCollectionRef,
          firebase.store.where('__name__', 'in', docs),
        );
        const querySnapshot = await firebase.store.getDocs(q);

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

        const profilesRef = firebase.store.collection(db, 'profiles');
        const docRef = firebase.store.doc(profilesRef, user.uid);

        return await firebase.store.getDoc(docRef).then(documentSnapshot => {
          if (documentSnapshot.exists) {
            const userProfile = documentSnapshot.data();
            cache.set('profile', userProfile);
            return userProfile;
          }

          return;
        });
      },
      getJobsInArea: async (area, onComplete) => {
        const workersCollectionRef = firebase.store.collection(
          db,
          'Worker Requests',
        );
        const q = firebase.store.query(
          workersCollectionRef,
          firebase.store.where('area', '==', area),
        );
        const querySnapshot = await firebase.store.getDocs(q);

        const jobs = [];
        querySnapshot.forEach(d => {
          jobs.push(d.data());
        });
        onComplete({ success: true, data: jobs });
      },
      geolocateProfiles: async (center, radiusInM, queryParams) => {
        if (!queryParams.has('settings.userViewType')) {
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

        Object.keys(searchParams).forEach(key => {
          const availableWeekdays = [];

          if (searchParams[key]) {
            if (key === 'skills') {
              const skillsArray = searchParams[key]
                .split(',')
                .map(s => parseInt(s, 10));

              constraints.push(
                firebase.store.Filter(
                  'trades',
                  'array-contains-any',
                  skillsArray,
                ),
              );
            }
            if (key === 'bizFocus') {
              const bizFocusArray = searchParams[key]
                .split(',')
                .map(s => parseInt(s, 10));

              constraints.push(
                firebase.store.Filter(
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
                  firebase.store.Filter(`availableWeekdays.${day}`, '==', true),
                );
                // constraints.push(
                //   firebase.store.Filter(`availableWeekdays.${day}`, '==', true),
                // );
              });
            }
            if (key === 'settings.userViewType') {
              constraints.push(
                firebase.store.Filter(
                  key,
                  '==',
                  parseInt(searchParams[key], 10),
                ),
              );
            }
          }
          if (availableWeekdays.length) {
            constraints.push(firebase.store.Filter.or(...availableWeekdays));
          }
        });

        const bounds = geofire.geohashQueryBounds(centerArray, radiusInM);
        const promises = [];

        for (const b of bounds) {
          const profilesRef = firebase.store.collection(db, 'profiles'); //
          const q = firebase.store.query(
            profilesRef, //
            firebase.store.where(
              constraints.length > 1
                ? firebase.store.Filter.and(...constraints) // Use 'and' for multiple constraints
                : constraints[0], // If only one constraint, use it directly
            ),
            firebase.store.orderBy('geohash'), // Order by 'geohash'
            firebase.store.startAt(b[0]), // Define the start point
            firebase.store.endAt(b[1]), // Define the end point
          );

          promises.push(firebase.store.getDocs(q));
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
      uploadResume: async (uid, fileUri, callbacks) => {
        // Check if uid exists
        const path = `${uid}/resume`;

        return new Promise((resolve, reject) => {
          API.uploadFileUri(fileUri, path, callbacks)
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
        const resumeRef = firebase.storage.ref(storage, path);
        await firebase.storage.deleteObject(resumeRef);
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
          data.timestamp = firebase.store.FieldValue.serverTimestamp(); // store.serverTimestamp(); // Timestamp.now(); // new Date().getTime();

          const mailRef = firebase.store.collection(defaultDb, 'mail');
          const emailDoc = firebase.store.doc(mailRef, data.currentUID);

          await firebase.store
            .setDoc(emailDoc, data)
            .then(() => {
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
          response.geoPoint = new firebase.store.GeoPoint(lat, lng);
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
        const fileRef = firebase.storage.ref(storage, path);

        // Convert base64 string to Uint8Array for uploadBytesResumable
        const base64Data = base64.includes(',') ? base64.split(',')[1] : base64;
        const binaryString = atob(base64Data);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        const task = firebase.storage.uploadBytesResumable(fileRef, bytes);

        task.on(
          'state_changed',
          taskSnapshot => {
            // console.log(
            //   `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
            // );
            callbacks?.onUploadProgress?.({
              progress:
                (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100,
            });
          },
          error => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case 'storage/unauthorized':
                // User doesn't have permission to access the object
                console.error('User unauthorized to upload file');
                break;
              case 'storage/canceled':
                // User canceled the upload
                console.error('User canceled file upload');
                break;

              // ...

              case 'storage/unknown':
                // Unknown error occurred, inspect error.serverResponse
                console.error('Unknown error occurred during file upload');
                break;
            }
          },
          () => {
            // Upload completed successfully, now we can get the download URL
            firebase.storage.getDownloadURL(task.snapshot.ref);
            // .then(downloadURL => {
            //   console.log('File available at', downloadURL);
            // });
          },
        );

        return task
          .then(() => {
            callbacks?.onSuccess?.(task);
            return task;
          })
          .catch(e => {
            callbacks?.onError?.(e);
          });
      },
      uploadFileUri: async (fileUri, path, callbacks) => {
        const fileRef = firebase.storage.ref(storage, path);

        try {
          // Fetch the file and convert to blob (preserves binary data)
          const response = await fetch(fileUri);
          const blob = await response.blob();

          const task = firebase.storage.uploadBytesResumable(fileRef, blob);

          task.on(
            'state_changed',
            taskSnapshot => {
              // console.log(
              //   `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
              // );
              callbacks?.onUploadProgress?.({
                progress:
                  (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
                  100,
              });
            },
            error => {
              console.error('Upload error: ', error);
              callbacks?.onError?.(error);
            },
            () => {
              // Upload completed successfully
              callbacks?.onSuccess?.(task);
            },
          );

          return task;
        } catch (error) {
          console.error('Error preparing file for upload:', error);
          callbacks?.onError?.(error);
          throw error;
        }
      },
      getFileURL: async name => {
        const fileRef = firebase.storage.ref(storage, name);
        const url = await firebase.storage.getDownloadURL(fileRef);
        return url;
      },
      deleteAccount: async () => {
        return new Promise(async (resolve, reject) => {
          try {
            // We may want to delete more content. I.e. nudges, favorites, etc.
            const UID = auth.currentUser?.uid;
            const profileRef = firebase.store.collection(db, 'profiles');
            const docRef = firebase.store.doc(profileRef, UID);

            return firebase.store
              .deleteDoc(docRef)
              .then(() => {
                return firebase.auth.deleteUser(auth.currentUser);
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
        return await firebase.auth.sendPasswordResetEmail(auth, email);
      },
    }),
    [
      auth,
      constants,
      db,
      defaultDb,
      firebase.app,
      firebase.auth,
      firebase.storage,
      firebase.store,
      firebaseAnalytics,
      storage,
      user,
    ],
  );
  useEffect(() => {
    const subscriber = firebase.auth.onAuthStateChanged(auth, u => {
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
  }, [API, auth, firebase.auth]);
  // return React.createElement(DayworkerContext.Provider, {value: API}, [...children]);
  return (
    <DayworkerContext.Provider value={API}>
      {children}
    </DayworkerContext.Provider>
  );
};
