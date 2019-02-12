import { Options, GraphQLServerLambda, GraphQLServer } from "graphql-yoga";
import { ShieldRule } from "graphql-shield/dist/types";
import { ListenOptions } from "apollo-engine/lib/engine";
import { EngineConfig } from "apollo-engine/lib/types";
import { Props } from "graphql-yoga/dist/types";

declare global {
  namespace Menhera {
    interface Resolver {
      resolve?: Function;
      shield?: ShieldRule;
    }
    interface MhrYoga {
      resolvers?: {
        Query?: { [key: string]: Resolver | Function };
        Mutation?: { [key: string]: Resolver | Function };
        Subscription?: { [key: string]: Resolver | Function };
        [key: string]: { [key: string]: Resolver | Function };
      };
      middlewares?: any[];
      typeDefs?: string | string[];
      options?: Props;
      listen?: Options;
      beforeStart?: (Mhr: Mhr) => Mhr;
    }
    interface HookFunction {
      _?: Function | Function[];
      $?: Function | Function[];
    }

    interface Hook {
      _resolvers?: Function | HookFunction;
    }

    interface UseObject {
      yoga?: MhrYoga;
      $hook?: Hook;
      mixins?: {
        [key: string]: Function;
      };
    }
    interface GqmlApolloConfig {
      options?: EngineConfig;
      listen?: ListenOptions;
    }

    interface Mhr {
      constructor(): Mhr;
      yoga(data: MhrYoga): Mhr;
      serverless(): GraphQLServerLambda;
      apollo(data: GqmlApolloConfig): Mhr;
      server?: GraphQLServer;
    }
  }
}

export const gqml: Menhera.Mhr;
export * from "graphql-shield";
export * from "graphql-yoga";
