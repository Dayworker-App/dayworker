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
import { FieldValue, Filter, GeoPoint } from '@react-native-firebase/firestore';

import * as utils from './utils';
export { utils };

let env = process.env.NODE_ENV;
// if (env === 'production') env = '(default)';
if (env === 'production') {
  env = 'development';
}

const googleMapsConfig = {
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
};

const cache = new Map();

export const DayworkerContext = React.createContext({
  user: undefined,
  setUser: async user => null,
  constants: undefined,

  userLoading: true,
  firebaseApp: undefined, //app,
  auth: undefined, //auth,

  signOut: async () => null,
  signIn: async (email, password) => null,
  signUp: async (email, password, input, userType, lang) => null,
  sendUpdatePasswordEmail: async email => null,
  updateProfile: async data => null,
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
});

export const useDayworker = () => useContext(DayworkerContext);

export const DayworkerProvider = ({
  children,
  firebase: { app, auth, storage, store, defaultStore },
}) => {
  const [user, setUser] = useState(undefined);
  const [constants, setConstants] = useState(undefined);

  //   const app = !firebase.app.getApps().length
  //     ? firebase.app.initializeApp(firebaseConfig)
  //     : firebase.app.getApps()[0];
  //   const auth = firebase.auth.getAuth(app);

  //   const db = store.getFirestore(app, env);
  //   const defaultDB =
  //     env != '(default)' ? store.getFirestore(app, '(default)') : db;

  const API = useMemo(
    () => ({
      user,
      setUser,
      constants,

      firebaseApp: app,
      auth: auth,

      signIn: async (email, password) => {
        return auth.signInWithEmailAndPassword(
          email.toLowerCase().trim(),
          password.trim(),
        );
      },
      signOut: async () => auth.signOut(),
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
            user = await auth.createUserWithEmailAndPassword(
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

          store
            .collection('profiles')
            .doc(UID)
            .set(input)
            .then(res => {
              // Send Welcome Email
              API.emailUser(email, `email--${templateName}--${templateLang}`, {
                name: input.name.trim(),
                year: new Date().getFullYear(),
              })
                .then(message => {
                  resolve(input);
                })
                .catch(console.error);
            })
            .catch(err => {
              console.error(err);
              reject('Profile data not loaded');
            });
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
        return auth.sendPasswordResetEmail(emailClean, actionCodeSettings);
      },
      updateProfile: async data => {
        return new Promise(async (resolve, reject) => {
          const UID = auth.currentUser?.uid;
          const profile = await store.collection('profiles').doc(UID).get();

          if (!profile.exists) {
            return reject(`Profile ${UID} doesn't exist.`);
          }
          // if (typeof data.zip === 'number') {
          const { geoPoint, geohash } = await API.googleMapsGeolocate(data.zip);
          data.geoPoint = geoPoint;
          data.geohash = geohash;
          // }
          await store
            .collection('profiles')
            .doc(UID)
            .update(data)
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
        docs: Array<string> = [
          'badges',
          'bizFocus',
          'regions',
          'skillLevel',
          'trades',
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

        const querySnapshot = await store
          .collection('constants')
          .where('__name__', 'in', docs)
          .get();

        const documents = [];
        querySnapshot.forEach(d => {
          documents.push(d.data());
        });
        const _const = {};
        documents.forEach(({ name, map }) => (_const[name] = map));
        cache.set('constants', _const);
        return _const;
      },
      getAuthenticatedUserProfile: async () => {
        if (!user) {
          return null;
        }
        if (cache.has('profile')) {
          return cache.get('profile');
        }

        return await store
          .collection('profiles')
          .doc(user.uid)
          .get()
          .then(documentSnapshot => {
            // console.log('User exists: ', documentSnapshot.exists);

            if (documentSnapshot.exists) {
              // console.log('documentSnapshot.data(): ', documentSnapshot.data());

              const userProfile = documentSnapshot.data();
              cache.set('profile', userProfile);
              return userProfile;
            }

            return;
          });
      },
      getJobsInArea: async (area, onComplete) => {
        const querySnapshot = await store
          .collection('Worker Requests')
          .where('area', '==', area)
          .get();
        const jobs = [];
        querySnapshot.forEach(d => {
          jobs.push(d.data());
        });
        onComplete({ success: true, data: jobs });
      },
      geolocateProfiles: async (center, radiusInM, queryParams) => {
        if (!queryParams.has('settings.userViewType')) {
          queryParams.append('settings.userViewType', '1');
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
                Filter('trades', 'array-contains-any', skillsArray),
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

        // queryParams.forEach((value, name) => {
        //   if (value === '') {
        //     return;
        //   }
        //   switch (name) {
        //     case 'skills':
        //       const trades = [];
        //       value
        //         .split(',')
        //         .map(v =>
        //           trades.push(
        //             store.where('trades', 'array-contains', parseInt(v)),
        //           ),
        //         );
        //       constraints.push(store.and(store.or(...trades)));
        //       break;
        //     case 'availableWeekdays':
        //       const days = [];
        //       value
        //         .split(',')
        //         .map(v => days.push(store.where(`${name}.${v}`, '==', true)));
        //       constraints.push(store.and(store.or(...days)));
        //       break;
        //     case 'settings.userViewType':
        //       constraints.push(store.where(name, '==', parseInt(value)));
        //       break;
        //     default:
        //       constraints.push(
        //         store.where(name, '==', Boolean(parseInt(value))),
        //       );
        //   }
        // });
        const bounds = geofire.geohashQueryBounds(centerArray, radiusInM);
        const promises = [];
        // console.log('bounds: ', bounds);
        for (const b of bounds) {
          promises.push(
            store
              .collection('profiles')
              .where(
                constraints.length > 1
                  ? Filter.and(...constraints)
                  : constraints[0],
              )
              .orderBy('geohash')
              .startAt(b[0])
              .endAt(b[1])
              .get(),
          );

          // const q = store.query(
          //   store.collection('profiles'),
          //   store.and(
          //     ...constraints,
          //     // ...constraints.map(processConstraints),
          //   ),
          //   store.orderBy('geohash'),
          //   store.startAt(b[0]),
          //   store.endAt(b[1]),
          //   //...constraints
          // );
          // // const profile = await store.getDocs(q);
          // const profile = await store.getDocs(q);
          // delete profile.email;
          // promises.push(profile);
        }
        const snapshots = await Promise.all(promises);
        const matchingDocs = [];

        for (const snap of snapshots) {
          if (snap.size) {
            for (const d of snap.docs) {
              const profile = d.data();
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
        const resumeRef = storage.ref(path);
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
        return new Promise((resolve, reject) => {
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

          const mailRef = defaultStore?.collection('mail');
          const emailDoc = mailRef.doc().id;

          defaultStore
            .collection('mail')
            .doc(emailDoc)
            .set(data, { merge: true })
            .then(() => {
              resolve('Email sent');
              console.log('Email sent');
            })
            .catch(err => {
              reject('Email not sent: ' + JSON.stringify(err));
            });
        });
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
        const task = storage.ref(path).putFile(base64);
        task.on('state_changed', taskSnapshot => {
          console.log(
            `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
          );
          callbacks?.onUploadProgress?.({
            progress:
              (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100,
          });
        });

        return task
          .then(() => {
            console.log('Image uploaded to the bucket!');
            callbacks?.onSuccess?.(task);
            return task;
          })
          .catch(e => {
            console.error('upload file error: ', e.message);
            callbacks?.onError?.(e);
          });
      },
      getFileURL: async name => {
        const url = await storage.ref(name).getDownloadURL();
        return url;
      },
      deleteAccount: async () => {
        return new Promise(async (resolve, reject) => {
          try {
            // We may want to delete more content. I.e. nudges, favorites, etc.
            const UID = auth.currentUser?.uid;
            const profileRef = store.collection('profiles').doc(UID);
            return profileRef
              .delete()
              .then(() => {
                return auth.currentUser.delete();
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
      sendForgotPasswordEmail: async (email: string) => {
        return await auth.sendPasswordResetEmail(email);
      },
    }),
    [app, auth, constants, defaultStore, storage, store, user],
  );
  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(u => {
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
      'settings',
      'privacyVersion',
      'termsVersion',
    ]).then(c => setConstants(() => c));
    return subscriber; // unsubscribe on unmount
  }, [API, auth]);
  // return React.createElement(DayworkerContext.Provider, {value: API}, [...children]);
  return (
    <DayworkerContext.Provider value={API}>
      {children}
    </DayworkerContext.Provider>
  );
};
