import { APP_SECONDARY_COLOR, APP_PRIMARY_COLOR } from ".";

export const CREATE_VB_BTN_ID = 'create-vb-btn-id';



export const NAVIGATION_DEFAULT_OPTIONS = {
    layout: {
        componentBackgroundColor: '#e8e8e8',
        orientation: ['portrait']
    },
    topBar: {
        leftButtonColor: 'white',
        rightButtonColor: 'white',

        title: {
            color: 'white',
        },
        background: {
            color: APP_PRIMARY_COLOR,

        }
    },
    bottomTab: {
        iconColor: APP_SECONDARY_COLOR,
        selectedIconColor: '#0f0',
        textColor: APP_SECONDARY_COLOR,
        selectedTextColor: '#0f0',
        fontFamily: 'HelveticaNeue-Italic',
        fontSize: 13
    },
    _animations: {
        push: {
            waitForRender: false,
        }
    },
    animations: {
        setRoot: {
            alpha: {
                from: 0,
                to: 1,
                duration: 300
            }
        },
        _push: {
            topBar: {
                id: 'TEST',
                alpha: {
                    from: 0,
                    to: 1,
                    duration: 500,
                    interpolation: 'accelerate'
                }
            },
            bottomTabs: {
                y: {
                    from: 1000,
                    to: 0,
                    duration: 500,
                    interpolation: 'decelerate',
                },
                alpha: {
                    from: 0,
                    to: 1,
                    duration: 500,
                    interpolation: 'decelerate'
                }
            },
            content: {
                y: {
                    from: 1000,
                    to: 0,
                    duration: 500,
                    interpolation: 'accelerate',
                },
                alpha: {
                    from: 0,
                    to: 1,
                    duration: 500,
                    interpolation: 'accelerate'
                }
            }
        },
        _pop: {
            topBar: {
                id: 'TEST',
                alpha: {
                    from: 1,
                    to: 0,
                    duration: 500,
                    interpolation: 'accelerate'
                }
            },
            bottomTabs: {
                y: {
                    from: 0,
                    to: 100,
                    duration: 500,
                    interpolation: 'accelerate',
                },
                alpha: {
                    from: 1,
                    to: 0,
                    duration: 500,
                    interpolation: 'accelerate'
                }
            },
            bottomTabs: {
                y: {
                    from: 0,
                    to: 100,
                    duration: 500,
                    interpolation: 'decelerate',
                },
                alpha: {
                    from: 1,
                    to: 0,
                    duration: 500,
                    interpolation: 'decelerate'
                }
            },
            content: {
                y: {
                    from: 0,
                    to: 1000,
                    duration: 500,
                    interpolation: 'decelerate',
                },
                alpha: {
                    from: 1,
                    to: 0,
                    duration: 500,
                    interpolation: 'decelerate'
                }
            }
        }
    }
}