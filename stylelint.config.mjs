export default {
  extends: "stylelint-config-standard",
  plugins: ["stylelint-order"],
  overrides: [
    {
      files: ["**/*.pcss", "**/*.css"],
      rules: {
        "order/order": ["custom-properties", "declarations"],
        "function-no-unknown": null,
        "rule-empty-line-before": [
          "always",
          { except: ["first-nested"], ignore: ["after-comment"] },
        ],
        "declaration-empty-line-before": [
          "never",
          { except: ["after-comment"] },
        ],
        "at-rule-empty-line-before": [
          "always",
          {
            except: [
              "inside-block",
              "blockless-after-same-name-blockless",
              "blockless-after-blockless",
            ],
            ignore: ["first-nested"],
            ignoreAtRules: ["supports", "media", "charset", "mixin"],
          },
        ],
        "comment-empty-line-before": null,
        "import-notation": "string",
        "at-rule-no-unknown": null,
        "no-descending-specificity": null,
        "custom-property-empty-line-before": null,
        "color-named": "never",
        "function-calc-no-unspaced-operator": true,
        "no-invalid-double-slash-comments": true,
        "font-weight-notation": "numeric",
        "color-function-notation": null,
        "alpha-value-notation": null,
        "value-keyword-case": null,
        "property-no-unknown": null,
        "no-duplicate-selectors": null,
        "shorthand-property-no-redundant-values": null,
        "property-no-vendor-prefix": null,
        "declaration-block-no-redundant-longhand-properties": null,
        "no-empty-source": null,
        "custom-media-pattern":
          "^[a-z][a-z0-9]*(([A-Z][a-z0-9]+)*[A-Z]?|([a-z0-9]+[A-Z])*|[A-Z])$",
        "keyframes-name-pattern":
          "^[a-z][a-z0-9]*(([A-Z][a-z0-9]+)*[A-Z]?|([a-z0-9]+[A-Z])*|[A-Z])$",
        "selector-class-pattern":
          "^[a-z][a-z0-9]*(([A-Z][a-z0-9]+)*[A-Z]?|([a-z0-9]+[A-Z])*|[A-Z])$",
        "custom-property-pattern":
          "^[a-z][a-z0-9]*(([A-Z][a-z0-9]+)*[A-Z]?|([a-z0-9]+[A-Z])*|[A-Z])$",
      },
    },
  ],
};
