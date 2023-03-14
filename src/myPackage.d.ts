interface Config {
    url: string;
}


declare module "myPackage" {
    export function init(config: Config): void;
    export function exit(code: number): void;
}