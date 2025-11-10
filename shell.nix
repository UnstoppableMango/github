{
  pkgs ? import <nixpkgs> { },
}:

pkgs.mkShellNoCC {
  packages = with pkgs; [
    dprint
    gnumake
    nodejs_24
    shellcheck
    pulumi-bin
    yarn
  ];

  DPRINT = pkgs.dprint + "/bin/dprint";
  NODE = pkgs.nodejs_24 + "/bin/node";
  PULUMI = pkgs.pulumi-bin + "/bin/pulumi";
  YARN = pkgs.yarn + "/bin/yarn";
}
