# Dayworker SDK

## Useage

#### Context Provider Component
`<DayWorkerProvider>
    {children}
</DayWorkerProvider>`

#### Use provider
`const { updateProfile, constants } = useDayWorker()`

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