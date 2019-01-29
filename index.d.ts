import { Options, GraphQLServerLambda } from "graphql-yoga";

declare global {
  namespace Menhera {
    interface MhrYoga {
      resolvers: any;
      _resolvers: any;
      middlewares: any[];
      typeDefs: any;
    }

    interface UseObject {
      yoga: MhrYoga;
      mixins: {
        (key: string): Function;
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
