 class User {
  
  email: string
  first_name: string
  user_name: string
  last_name: string
  phone_num : number
  country:string
  dob:Date
  constructor(email: string, first_name: string, user_name: string, last_name: string, phone_num: number, country: string, dob: Date  = new Date()  ) {
    this.email = email
    this.first_name = first_name
    this.user_name = user_name
    this.last_name = last_name
    this.phone_num = phone_num
    this.dob = dob
    this.country = country
  }
}

export default User;