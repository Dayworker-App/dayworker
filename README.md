# Dayworker SDK

## Peer Dependencies
Installing all 3 dependencies is required before installing module
```
"peerDependencies": {
    "firebase": "^10.11.0",
    "geofire-common": "^6.0.0",
    "react": "^18.0.0"
}
```

## Useage
`npm i github:Dayworker-App/dayworker`

#### Context Provider Component
`import { DayworkerProvider } from "dayworker"`
```
<DayworkerProvider>
    {children}
</DayworkerProvider>
```

#### Use Hook
`const { updateProfile, constants } = useDayworker()`

## Properties
`user: undefined`
`userLoading: true`
`firebaseApp: app`
`auth`
`constants: undefined`

## Methods
#### setUser()
`setUser: async (user) => null`
#### signOut()
`signOut`
#### signIn(email, password)
`signIn(email: string, password: string): Promise<UserCredential>`
#### signUp(email, password, input, userType, lang)
```
interface AccountRequest { zip: string, geoPoint: string, geohash: string, name: string }
interface AccountAuthenticated extends AccountRequest { uid: string }
signUp(email: string, password: string, input: AccountRequest, userType: 'worker' | 'contractor', lang: 'en-US' | 'es-MX'): Promise<AccountAuthenticated>
// To Do: If the { zip: number } is in the data, geoPoint and geohash will be defined. I'll create an issue for this in this repo.
// Issue: The zip is currently typed as number in the SDK and the database, but I believe there are zipcodes that start with zero... I'll create an issue on this repo if so.
```
#### sendUpdatePasswordEmail(email)
```
sendUpdatePasswordEmail(email: string): Promise<void>
// Note: For mobile: please define the params on this repo:
/*
iOS: {
    bundleId: 'com.example.ios'
},
    android: {
    packageName: 'com.example.android',
    installApp: true,
    minimumVersion: '12'
},
*/
```
#### updateProfile()
```
type AccountAuthenticated = { zip: string, geoPoint: string, geohash: string, name: string, uid: string }
updateProfile(data: AccountAuthenticated): Promise<AccountAuthenticated>
// Note: If the { zip: number } is in the data, geoPoint and geohash will be defined.
// Issue: The zip is currently typed as number in the SDK and the database, but I believe there are zipcodes that start with zero... I'll create an issue on this repo if so.
```
#### processAuthError(error)
```
type LangKey = string // Ex: error.incorrectEmailFormat
processAuthError(error: { message: string, code: number }): { origMessage: message, code, message: LangKey }
```
#### checkTranslated(t, key)
```
type tFunction (key) => string // This is the babel translation function t()
type LangKey = string // Ex: error.incorrectEmailFormat
checkTranslated(t: tFunction, key: LangKey ): boolean
// Checks if a string has been translated or not.
// To Do: Maybe move to utils...
```
#### getConstants(docs)
`getConstants(docs: string): { [key: string]: value: string | number | boolean | null }`
#### getAuthenticatedUserProfile()
```
type AccountAuthenticated = { zip: string, geoPoint: string, geohash: string, name: string, uid: string }
getAuthenticatedUserProfile(): AccountAuthenticated
```
#### geolocateProfiles(center, radiusInM, queryParams)
```
geolocateProfiles(center: [latitude, longitude], radiusInM: number, queryParams: URLSearchParams): User[]
/**
queryParams:
------------
settings.userViewType: '1' | '2'
skills: string // Ex: carpentry,construction
availableWeekdays: string // Ex: m,t,w,r,f
// ... More coming soon
**/
```
#### updateProfileImage(uid, base64)
`updateProfileImage(uid: string, base64: string): promise<string>`
#### utils
`utils.obMap()`
`utils.getInitials()`
`utils.clean()`
`utils.textToHexColor()`