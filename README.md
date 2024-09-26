# Dayworker SDK

## Peer Dependencies
Installing all 3 dependencies is required before installing module
`
"peerDependencies": {
    "firebase": "^10.11.0",
    "geofire-common": "^6.0.0",
    "react": "^18.0.0"
}
`

## Useage
`npm i github:Dayworker-App/dayworker`

#### Context Provider Component
`import { DayWorkerProvider } from "dayworker"`
`
<DayworkerProvider>
    {children}
</DayworkerProvider>
`

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
#### signIn()
`signIn`
#### signUp()
`signUp`
#### sendUpdatePasswordEmail()
`sendUpdatePasswordEmail`
#### updateProfile()
`updateProfile`
#### processAuthError()
`processAuthError`
#### checkTranslated()
`checkTranslated`
#### getConstants()
`getConstants`
#### getAuthenticatedUserProfile()
`getAuthenticatedUserProfile: async () => null`
#### getJobsInArea()
`getJobsInArea`
#### geolocateProfiles()
`geolocateProfiles`
#### updateProfileImage()
`updateProfileImage`
#### utils
`utils.obMap()`
`utils.getInitials()`
`utils.clean()`
`utils.textToHexColor()`