import { ObjectID, Entity, Column, PrimaryColumn, ObjectIdColumn } from "typeorm"
import {Contact} from './user.contact.model'

@Entity({name: "user"})
export class User {
    @ObjectIdColumn()
    id: ObjectID

    @Column({type: "string"})
    userName: string;

    @Column()
    contact: Array<Contact>
}
