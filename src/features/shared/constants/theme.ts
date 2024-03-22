import { extendTheme } from "@chakra-ui/react";
// @ts-ignore
import resolveConfig from "tailwindcss/resolveConfig";
// @ts-ignore
import tailwindConfig from "../../../../tailwind.config";

const tailwind = resolveConfig(tailwindConfig);

const colors = tailwind.theme.colors;

export const chakraTheme = extendTheme({
  colors: {
    brand: colors.brand.DEFAULT,
    error: colors.error.DEFAULT,
    long: colors.long.DEFAULT,
    short: colors.short.DEFAULT,
    bg: colors.bg.DEFAULT,
    transparent: colors.transparent,
  },

  components: {
    Button: {
      variants: {
        brand: {
          background: colors.brand.DEFAULT,
          color: colors.black,

          _hover: {
            background: colors.brand.semiDark,

            _disabled: {
              background: colors.brand.DEFAULT,
            }
          },

          _active: {
            background: colors.brand.dark,
          },
        },

        error: {
          background: colors.error.DEFAULT,
          color: colors.black,

          _hover: {
            background: colors.error.semiDark,

            _disabled: {
              background: colors.error.DEFAULT,
            }
          },

          _active: {
            background: colors.error.dark,
          },
        },

        long: {
          background: colors.long.DEFAULT,
          color: colors.black,

          _hover: {
            background: colors.long.semiDark,

            _disabled: {
              background: colors.long.DEFAULT,
            }
          },

          _active: {
            background: colors.long.dark,
          },
        },

        short: {
          background: colors.short.DEFAULT,
          color: colors.black,

          _hover: {
            background: colors.short.semiDark,

            _disabled: {
              background: colors.short.DEFAULT,
            }
          },

          _active: {
            background: colors.short.dark,
          },
        },

        solid: {
          background: colors.bg.secondary,
          color: colors.white,

          _hover: {
            background: colors.bg.secondaryLight,

            _disabled: {
              background: colors.bg.secondary,
            }
          },

          _active: {
            background: colors.bg.secondaryDark,
          },
        },

        border: {
          background: colors.bg.outline,
          color: colors.white,
          border: "1px solid",
          borderColor: colors.bg.secondary,

          _hover: {
            borderColor: colors.white,

            _disabled: {
              background: colors.bg.outline,
            }
          },

          _active: {
            background: colors.bg.secondary,
          },
        },
      },
    },

    Checkbox: {
        baseStyle: {
          "[data-checked]": {
            control: {
              borderColor: colors.brand.DEFAULT,
            },
          },
          control: {
            borderColor: colors.brand.DEFAULT,
          },
          icon: {
            color: colors.bg.secondary,
            background: colors.brand.DEFAULT,
          },
          label: {
            color: colors.white,
          }
        },
        variants: {
            filled: {
              control: {
                borderColor: colors.brand.DEFAULT,
              },
            }
        }
    },

    Select: {
      baseStyle: {
        field: {
          color: colors.white,
        },
        icon: {
          color: colors.white,
        },
      },

      variants: {
        filled: {
          field: {
            border: "none",
            background: colors.bg.secondary,

            _hover: {
              background: colors.bg.secondaryLight,
            },

            _focus: {
              background: colors.bg.secondary,
            },
          },
        },
      },
    },

    Input: {
      baseStyle: {
        field: {
          px: 3,
          borderRadius: 0,
        }
      },

      variants: {
        filled: {
          field: {
            background: colors.bg.secondary,
            border: "none",
            color: colors.text.white,

            _hover: {
              background: colors.bg.secondary,
            },

            _focus: {
              background: colors.bg.secondaryLight,
            },
          },
        },

        error: {
          field: {
            background: colors.bg.secondary,
            border:' none',
            color: colors.error.DEFAULT,

            _hover: {
              background: colors.bg.secondary,
            },

            _focus: {
              background: colors.bg.secondaryLight,
            },
          },
        },
      },
    },

    Slider: {
      baseStyle: {
        filledTrack: {
          background: colors.brand.DEFAULT,
        },
        track: {
          background: colors.bg.secondary,
        },
        thumb: {
          background: colors.brand.DEFAULT,
        },
      },
    },

    Link: {
      baseStyle: {
        color: colors.text.gray,
        whiteSpace: 'nowrap',
        fontWeight: 600,
        '&:hover': { textDecoration: 'none' },
      },
    },

    Modal: {
      baseStyle: {
        dialog: {
          background: colors.bg.primary,
          border: "1px solid",
          borderColor: colors.bg.secondary,
          padding: 4,
        },
      },
    },

    Table: {
      baseStyle: {
        th: {
          fontFamily: "Inter",
          fontWeight: "medium",
          textTransform: "none",
          letterSpacing: "normal",
          color: colors.text.gray,
        },

        td: {
          color: colors.text.white,
        },
      },
    },

    CloseButton: {
        baseStyle: {
            color: colors.text.white,
        }
    },

    Menu: {
      baseStyle: {
        list: {
          background: colors.bg.secondary,
          border: "1px solid",
          borderColor: colors.bg.secondaryDark,
        },

        item: {
          background: colors.bg.secondary,
          color: colors.white,

          _hover: {
            background: colors.bg.secondaryLight,
          },
        }
      }
    },

    Tabs: {
      baseStyle: {
        tablist: {
          background: colors.bg.primary,
          color: colors.text.gray,
          borderRadius: "8px 8px 0 0",
          borderColor: colors.bg.secondary,
          button: {
            fontSize: "14px",
          }
        },
        tab: {
          _selected: {
            color: colors.brand.DEFAULT,
          },
        },
        tabpanel: {
          py: '0',
          px: '0',
        },
      }
    }
  },
});
