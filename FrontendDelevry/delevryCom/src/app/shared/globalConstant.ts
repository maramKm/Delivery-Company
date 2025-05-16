export class GlobalConstant{
    public static genericError : string ="Somthing went wrong . please try again later"
    public static unauthorized :string = "you are not authorized person access this page"
    //regex
    public static nameRegex: string = "^[a-zA-Z0-9]+$"; // Validation du nom alphanumérique.
public static emailRegex: string = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[a-zA-Z]{2,}$"; // Validation de l'email.
public static contactNumberRegex: string = "^[0-9]{8}$"; // Validation d'un numéro de téléphone de 8 chiffres.


    //variable
    public static error:string ='error';

}