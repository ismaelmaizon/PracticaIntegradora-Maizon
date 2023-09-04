
export default class CurrentUserDto {
    constructor( user ){
        console.log(user);
        this.name = user.email;
        this.email = user.email;
        this.role = user.role;
    };
}