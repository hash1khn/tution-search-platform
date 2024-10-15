// utils

// ----------------------------------------------------------------------

const ROOTS = {
    AUTH: '/auth',
    DASHBOARD: '/dashboard',
    ADMIN: '/admin',
    TEACHER: '/teacher',
    STUDENT: '/student',
  };
  
  // ----------------------------------------------------------------------
  
  export const paths = {
    page403: '/403',
    page404: '/404',
    page500: '/500',
  
    // AUTH
    auth: {
      jwt: {
        login: `${ROOTS.AUTH}/jwt/login`,
        register: `${ROOTS.AUTH}/jwt/register`,
        forgotPassword: `${ROOTS.AUTH}/jwt/forgot-password`,
        newPassword: `${ROOTS.AUTH}/jwt/new-password`,
      },
    },
  
    // DASHBOARD
    dashboard: {
      root: ROOTS.DASHBOARD,
    },
  
    // ADMIN
    admin: {
      root: ROOTS.ADMIN,
      company: {
        new: `${ROOTS.ADMIN}/company/new`,
        list: `${ROOTS.ADMIN}/company/list`,
        edit: (id) => `${ROOTS.ADMIN}/company/${id}/edit`,
      },
      settings: {
        root: `${ROOTS.ADMIN}/settings`,
        edit: (id) => `${ROOTS.ADMIN}/settings/${id}/edit`,
        details: (id) => `${ROOTS.ADMIN}/settings/${id}`,
      },
    },
  
    // TEACHER
    teacher: {
      root: ROOTS.TEACHER,
      classes: {
        new: `${ROOTS.TEACHER}/classes/new`,
        list: `${ROOTS.TEACHER}/classes/list`,
        edit: (id) => `${ROOTS.TEACHER}/classes/${id}/edit`,
      },
      assignments: {
        new: `${ROOTS.TEACHER}/assignments/new`,
        list: `${ROOTS.TEACHER}/assignments/list`,
        edit: (id) => `${ROOTS.TEACHER}/assignments/${id}/edit`,
        details: (id) => `${ROOTS.TEACHER}/assignments/${id}`,
      },
    },
  
    // STUDENT
    student: {
      root: ROOTS.STUDENT,
      classes: {
        list: `${ROOTS.STUDENT}/classes/list`,
        details: (id) => `${ROOTS.STUDENT}/classes/${id}`,
      },
      assignments: {
        list: `${ROOTS.STUDENT}/assignments/list`,
        details: (id) => `${ROOTS.STUDENT}/assignments/${id}`,
        submit: (id) => `${ROOTS.STUDENT}/assignments/${id}/submit`,
      },
      grades: {
        list: `${ROOTS.STUDENT}/grades/list`,
        details: (id) => `${ROOTS.STUDENT}/grades/${id}`,
      },
    },
  
    // COMMON SUBSCRIBER ROUTES
    subscriber: {
      onboarding: '/onboarding',
      invite: {
        details: (id) => `/invite/${id}`,
        create: (id) => `/invite/${id}/create`,
      },
      submittals: {
        new: `${ROOTS.SUBSCRIBER}/submittals/new`,
        revision: (id) => `${ROOTS.SUBSCRIBER}/submittals/${id}/revision`,
        list: `${ROOTS.SUBSCRIBER}/submittals/list`,
        edit: (id) => `${ROOTS.SUBSCRIBER}/submittals/${id}/edit`,
        details: (id) => `${ROOTS.SUBSCRIBER}/submittals/${id}`,
        review: (id) => `${ROOTS.SUBSCRIBER}/submittals/${id}/review`,
        responseDetails: (id) => `${ROOTS.SUBSCRIBER}/submittals/${id}/response/details`,
      },
      // Repeat similar structure for other areas such as RFI, Meeting Minutes, etc.
      rfi: {
        new: `${ROOTS.SUBSCRIBER}/rfi/new`,
        list: `${ROOTS.SUBSCRIBER}/rfi/list`,
        edit: (id) => `${ROOTS.SUBSCRIBER}/rfi/${id}/edit`,
        details: (id) => `${ROOTS.SUBSCRIBER}/rfi/${id}`,
        response: (id) => `${ROOTS.SUBSCRIBER}/rfi/${id}/response`,
      },
      // Add other subscriber-related routes as needed...
    },
  };
  