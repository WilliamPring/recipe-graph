
import { Args, Query, Resolver, ResolveProperty, Mutation, Parent, ResolveField, ResolveReference } from '@nestjs/graphql';
import {RecipeService, UserService} from '@recipe-graph/crud-layer'
import { CreateReceipeDto, ReceipeDto, UserDto } from '@recipe-graph/transfer-object';
@Resolver('Recipe')
export class RecipeResolver {
  constructor(private recipeService: RecipeService) {}


  @Mutation()
  async createRecipe(@Args('input') input: CreateReceipeDto) : Promise<ReceipeDto> {
    return this.recipeService.create(input)
  }

  @Query()
  receipes(
    @Args('where') where: {},
    @Args('order') order: {},
    @Args('limit') limit: number,
    @Args('offset') offset: number
  ) : Promise<ReceipeDto[]> {
    return this.recipeService.find(where, order, limit, offset)
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; userName: string }) : Promise<ReceipeDto> {
    console.log('inside')
    return this.recipeService.findbyUserName(reference.userName);
  }

  @ResolveProperty('author')
  getUser(@Parent() receipe: ReceipeDto) {
    console.log("test")
   // return this.userService.findbyUserName(receipe.userName);
    return { __typename: 'User', userName: receipe.userName };
  }
}
