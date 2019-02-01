import { Options, GraphQLServerLambda, GraphQLServer } from "graphql-yoga";
import { ShieldRule } from "graphql-shield/dist/types";
import { ListenOptions } from "apollo-engine/lib/engine";
import { EngineConfig } from "apollo-engine/lib/types";

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
    interface GqmlApolloConfig {
      config: EngineConfig;
      listen: ListenOptions;
    }

    interface Mhr {
      yoga(data: MhrYoga): Mhr;
      serverless(): GraphQLServerLambda;
      start(options: Options): Mhr;
      apollo(data: GqmlApolloConfig): Mhr;
    }

    interface Gqml extends MhrStatic {
      server: GraphQLServer;
    }
  }
}

export const gqml: Menhera.Gqml;
export * from "graphql-shield";
export * from "graphql-yoga";
