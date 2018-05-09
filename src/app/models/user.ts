export class Contact {
    address: string;
    landline: string;
    mobile: string;
}
export class User {
   
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    contact: Contact = new Contact();


}
