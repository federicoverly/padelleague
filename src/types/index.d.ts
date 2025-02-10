declare module "*.module.css" {
  const content: Record<string, string>;
  export default content;
}

declare module "*.jpeg" {
  const value: any;
  export = value;
}

declare module "*.jpg" {
  const value: any;
  export = value;
}

declare module "*.png" {
  const value: any;
  export = value;
}
