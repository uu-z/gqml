import { Options, GraphQLServerLambda } from "graphql-yoga";

declare global {
  namespace Menhera {
    interface MhrYoga {
      resolvers: {
        Query: { [key: string]: Object | Function };
        Mutation: { [key: string]: Object | Function };
        Subscription: { [key: string]: Object | Function };
        [key: string]: { [key: string]: Object | Function };
      };
      middlewares: any[];
      typeDefs: string | string[];
    }
    interface HookFunction {
      _: Function | Function[];
      $: Function | Function[];
    }
    interface MhrYogaHook {
      handler: Function | HookFunction;
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
      start(options: Options): void;
    }
  }
}

export const gqml: Menhera.MhrStatic;
export * from "graphql-shield";
export * from "graphql-yoga";
