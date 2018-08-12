export class Producer{
    constructor(producerId: number, name: string, sex: string, dob: Date, bio: string){
        this.ProducerId = producerId;
        if(bio != null){
            this.Bio = bio;
        }
        if(dob != null){
            this.Dob = dob;
        }
        if(name != null){
            this.Name = name;
        }
        if(sex != null){
            this.Sex = sex;
        }
    }    
    public ProducerId: number;
    public Name: string;
    public Sex: string;
    public Dob: Date;
    public Bio: string;
}