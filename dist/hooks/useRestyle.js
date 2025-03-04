"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var typeHelpers_1 = require("../typeHelpers");
var useDimensions_1 = __importDefault(require("./useDimensions"));
var useTheme_1 = __importDefault(require("./useTheme"));
var filterRestyleProps = function (componentProps, omitPropertiesMap) {
    var _a;
    // eslint-disable-next-line prettier/prettier
    var props = ((_a = omitPropertiesMap) === null || _a === void 0 ? void 0 : _a.variant) ? __assign({ variant: 'defaults' }, componentProps) : componentProps;
    return typeHelpers_1.getKeys(props).reduce(function (_a, key) {
        var _b, _c;
        var cleanProps = _a.cleanProps, restyleProps = _a.restyleProps, serializedRestyleProps = _a.serializedRestyleProps;
        if (omitPropertiesMap[key]) {
            return {
                cleanProps: cleanProps,
                restyleProps: __assign(__assign({}, restyleProps), (_b = {}, _b[key] = props[key], _b)),
                serializedRestyleProps: "" + serializedRestyleProps + key + ":" + props[key] + ";",
            };
        }
        else {
            return {
                cleanProps: __assign(__assign({}, cleanProps), (_c = {}, _c[key] = props[key], _c)),
                restyleProps: restyleProps,
                serializedRestyleProps: serializedRestyleProps,
            };
        }
    }, { cleanProps: {}, restyleProps: {}, serializedRestyleProps: '' });
};
var useRestyle = function (composedRestyleFunction, props) {
    var theme = useTheme_1.default();
    var dimensions = useDimensions_1.default();
    var _a = filterRestyleProps(props, composedRestyleFunction.propertiesMap), cleanProps = _a.cleanProps, restyleProps = _a.restyleProps, serializedRestyleProps = _a.serializedRestyleProps;
    var calculatedStyle = react_1.useMemo(function () {
        var style = composedRestyleFunction.buildStyle(restyleProps, {
            theme: theme,
            dimensions: dimensions,
        });
        var styleProp = props.style;
        if (typeof styleProp === 'function') {
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return [style, styleProp.apply(void 0, args)].filter(Boolean);
            };
        }
        return [style, styleProp].filter(Boolean);
        // We disable the exhaustive deps rule here in order to trigger the useMemo
        // when the serialized string of restyleProps changes instead of the object
        // reference which will change on every render.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        theme,
        dimensions,
        props.style,
        serializedRestyleProps,
        composedRestyleFunction,
    ]);
    return __assign(__assign({}, cleanProps), { style: calculatedStyle });
};
exports.default = useRestyle;
