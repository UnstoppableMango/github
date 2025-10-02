{
  pkgs ? import <nixpkgs> { },
}:

pkgs.mkShellNoCC {
  packages = with pkgs; [
    dprint
    gnumake
    nixfmt-tree
    nodejs_24
    shellcheck
    pulumi-bin
    yarn
  ];

  PULUMI = pkgs.pulumi-bin + "/bin/pulumi";
}
