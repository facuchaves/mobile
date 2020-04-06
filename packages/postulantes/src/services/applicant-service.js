import { get } from '@navent-jobs/utils'

export class ErrorGetSimplifiedInfo extends Error {}

class ApplicantService {
  async GetSimplifiedInfo() {
    return get('api/candidates/datosPostulanteResumido', { sendCookies: true })
  }
}

const applicantService = new ApplicantService()
export default applicantService
