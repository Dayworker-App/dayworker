# Dayworker SDK

## Useage
`npm i https://github.com/Dayworker-App/dayworker.git`

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