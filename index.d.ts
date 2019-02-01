import { Options, GraphQLServerLambda, GraphQLServer } from "graphql-yoga";
import { ShieldRule } from "graphql-shield/dist/types";

declare global {
  namespace Menhera {
    interface Resolver {
      resolve: Function;
      shield: ShieldRule;
      hide: Boolean;
    }
    interface MhrYoga {
      resolvers: {
        Query: { [key: string]: Resolver | Function };
        Mutation: { [key: string]: Resolver | Function };
        Subscription: { [key: string]: Resolver | Function };
        [key: string]: { [key: string]: Resolver | Function };
      };
      middlewares: any[];
      typeDefs: string | string[];
    }
    interface HookFunction {
      _: Function | Function[];
      $: Function | Function[];
    }
    interface MhrYogaHook {
      _handler: Function | HookFunction;
    }

    interface UseObject {
      $yoga: MhrYogaHook;
      yoga: MhrYoga;
      mixins: {
        [key: string]: Function;
      };
    }

    interface Mhr {
      yoga(data: MhrYoga): Mhr;
      serverless(): GraphQLServerLambda;
      start(options: Options): GraphQLServer;
    }
  }
}

export const gqml: Menhera.MhrStatic;
export * from "graphql-shield";
export * from "graphql-yoga";
