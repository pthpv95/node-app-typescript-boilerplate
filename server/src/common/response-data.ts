export class ResponseData {
  constructor(ok: boolean, data: any){
    this.ok = ok
    this.data = data
  }

  ok: boolean
  data: any
}