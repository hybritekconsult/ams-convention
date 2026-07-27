// Declare CSS modules so TypeScript doesn't error on CSS side-effect imports
declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}
