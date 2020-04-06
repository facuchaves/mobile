let currentConfig = {}
let configs = {}

const baseConfig = {}

configs['test'] = {
  api: {
    rest: {
      url: 'http://httpbin.org',
      app: {
        clientid: '',
        secret: '',
        tokenName: '',
      },
      user: {
        clientid: '',
        secret: '',
      },
      connectTimeout: 10000,
      readTimeout: 180000,
      group_id: '',
    },
  },
}

configs['bm-dev'] = {
  api: {
    rest: {
      url: 'http://bumeran.qa.api.core.jobs.navent.biz',
      app: {
        clientid: 'producto-developers-client-id',
        secret: 'producto-developers-client-secret',
        tokenName: 'navent_api_token',
      },
      user: {
        clientid: 'producto-developers-client-id',
        secret: 'producto-developers-client-secret',
      },
      connectTimeout: 10000,
      readTimeout: 180000,
      group_id: 'postulantes',
    },
  },
}

configs['zj-dev'] = {
  api: {
    rest: {
      url: 'http://zonajobs.qa.api.core.jobs.navent.biz',
      app: {
        clientid: 'producto-developers-zj-client-id',
        secret: 'producto-developers-zj-client-secret',
        tokenName: 'navent_api_token',
      },
      user: {
        clientid: 'producto-developers-zj-client-id',
        secret: 'producto-developers-client-secret',
      },
      connectTimeout: 10000,
      readTimeout: 180000,
      group_id: 'postulantes',
    },
  },
}

configs['bm-prepro'] = {
  api: {
    rest: {
      url: 'http://bm-applicants.prepro.api.core.jobs.navent.biz',
      app: {
        clientid: 'producto-developers-client-id',
        secret: 'producto-developers-client-secret',
        tokenName: 'navent_api_token',
      },
      user: {
        clientid: 'producto-developers-client-id',
        secret: 'producto-developers-client-secret',
      },
      connectTimeout: 10000,
      readTimeout: 180000,
      group_id: 'postulantes',
    },
  },
}

configs['zj-prepro'] = {
  api: {
    rest: {
      url: 'http://zj-applicants.prepro.api.core.jobs.navent.biz',
      app: {
        clientid: 'producto-developers-zj-client-id',
        secret: 'producto-developers-client-secret',
        tokenName: 'navent_api_token',
      },
      user: {
        clientid: 'producto-developers-zj-client-id',
        secret: 'producto-developers-client-secret',
      },
      connectTimeout: 10000,
      readTimeout: 180000,
      group_id: 'postulantes',
    },
  },
}

configs['bm-qa'] = {
  api: {
    rest: {
      url: 'http://bumeran.qa.api.core.jobs.navent.biz',
      app: {
        clientid: 'producto-developers-client-id',
        secret: 'producto-developers-client-secret',
        tokenName: 'navent_api_token',
      },
      user: {
        clientid: 'producto-developers-client-id',
        secret: 'producto-developers-client-secret',
      },
      connectTimeout: 10000,
      readTimeout: 180000,
      group_id: 'postulantes',
    },
  },
}

configs['zj-qa'] = {
  api: {
    rest: {
      url: 'http://zonajobs.qa.api.core.jobs.navent.biz',
      app: {
        clientid: 'producto-developers-zj-client-id',
        secret: 'producto-developers-zj-client-secret',
        tokenName: 'navent_api_token',
      },
      user: {
        clientid: 'producto-developers-zj-client-id',
        secret: 'producto-developers-client-secret',
      },
      connectTimeout: 10000,
      readTimeout: 180000,
      group_id: 'postulantes',
    },
  },
}

configs['bm-prod'] = {
  api: {
    rest: {
      url: 'http://bm-applicants.api.core.jobs.navent.biz',
      app: {
        clientid: 'postulantes-bum-1998DC25AEFA96712205CEB719A1222D',
        secret: 'C8EEC05D7D4C122776B844810DF1203E',
        tokenName: 'navent_api_token',
      },
      user: {
        clientid: 'postulantes-bum-1998DC25AEFA96712205CEB719A1222D',
        secret: 'C8EEC05D7D4C122776B844810DF1203E',
      },
      connectTimeout: 10000,
      readTimeout: 180000,
      group_id: 'postulantes',
    },
  },
}

configs['zj-prod'] = {
  api: {
    rest: {
      url: 'http://zj-applicants.api.core.jobs.navent.biz',
      app: {
        clientid: 'postulantes-zj-E5D275BA8ECAD0412C705BD3FF391BCA',
        secret: 'C12E9E1157C0FAE4D8A9D4222BCC0F47',
        tokenName: 'navent_api_token',
      },
      user: {
        clientid: 'postulantes-zj-E5D275BA8ECAD0412C705BD3FF391BCA',
        secret: 'C12E9E1157C0FAE4D8A9D4222BCC0F47',
      },
      connectTimeout: 10000,
      readTimeout: 180000,
      group_id: 'postulantes',
    },
  },
}

export const init = NODE_ENV => {
  currentConfig = configs[NODE_ENV]
}

export const getConfig = (): any => {
  currentConfig = configs[process.env.NODE_ENV]
  return currentConfig
}
