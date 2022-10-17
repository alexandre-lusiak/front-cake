export class User {
    id: number;
    lastName: string;
    firstName: string;
    email: string;
    phone: string;
    address: string 
    postalCode : string 
    city : string 
    country : string 
    role: string;
    constructor(id: number, lastName: string, firstName: string,  email: string, phone:  string, address: string , postalCode : string , city : string , country : string , role: string) {
        this.id = id;
        this.lastName = lastName;
        this.firstName = firstName;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.postalCode = postalCode;
        this.city = city;
        this.country = country;
        this.role = role;
    }
}

