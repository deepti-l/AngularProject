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
export class Clientdetails {
    clientId:string="spring-security-oauth2-read-write-client";
    clientPassword:string="spring-security-oauth2-read-write-client-password1234";
    grantType:string ="password";
}