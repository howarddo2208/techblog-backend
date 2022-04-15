import { Post } from 'src/posts/post.entity'
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  public title: string

  @Column()
  public metaTitle: string

  @Column()
  public slug: string

  @Column()
  public summary: string

  @ManyToMany(() => Post, (post) => post.categories)
  @JoinTable()
  public posts: Post[]
}
