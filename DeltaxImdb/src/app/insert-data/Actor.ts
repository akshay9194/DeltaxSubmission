export class Actor{
    constructor(actorId: number, name: string, sex: string, dob: Date, bio: string){
        this.ActorId = actorId;
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
    public ActorId: number;
    public Name: string;
    public Sex: string;
    public Dob: Date;
    public Bio: string;
}