/* eslint-disable no-unused-vars */
enum BEACON_LOCATION {
  MUICT = 'MUICT',
  LA = 'LA',
}

// export const LINE_BEACON_LOCATION: Record<BEACON_LOCATION, string> = {
//   MUICT: '000007e022',
//   LA: '000007e02c',
// }

export const LINE_BEACON_LOCATION: Record<string, Record<BEACON_LOCATION, string>> = {
  production: {
    MUICT: '000007e022',
    LA: '000007e02c',
  },
  development: {
    MUICT: '00000768c1',
    LA: '00000768c0',
  },
  test: {
    MUICT: '00000768c1',
    LA: '00000768c0',
  },
}

export const LINE_BEACON_HWID = Object.entries(LINE_BEACON_LOCATION[process.env.NODE_ENV]).reduce(
  (acc, [location, hwid]) => {
    acc[hwid] = location as BEACON_LOCATION
    return acc
  },
  {} as Record<string, BEACON_LOCATION>
)
