import Platform from 'Platform'; // eslint-disable-line

/**
 * 平台模块访问类
 */
class PlatformModule {
    /**
     * 创建一个平台访问类实例
     * @param {Object} $module 平台模块对象
     * @memberof PlatformModule
     */
    constructor($module) {
        this.$module = $module;
    }

    /**
     * 使用名称路径调用平台模块方法或者获取属性
     *
     * @param {string|string[]} nameArr 名称路径，使用 '.' 拼接或者使用字符串数组
     * @param {...any} params 调用方法时用到的参数表
     * @returns {any} 返回所调用的方法执行结果
     * @memberof PlatformModule
     */
    call(nameArr, ...params) {
        const $module = this.access(nameArr);
        if (typeof $module === 'function') {
            return $module(...params);
        }
        return $module;
    }

    /**
     * 根据名称路径获取模块内属性值
     *
     * @param {string[]} nameArr 名称数组
     * @returns {any} 属性值
     * @memberof PlatformModule
     */
    access(nameArr) {
        if (typeof nameArr === 'string') {
            nameArr = nameArr.split('.');
        }
        let {$module} = this;
        for (const name of nameArr) {
            $module = $module[name];
            if ($module === null || typeof $module !== 'object') {
                break;
            }
        }
        return $module;
    }

    /**
     * 判断平台模块中是否拥有指定的方法或属性定义
     *
     * @param {string[]} nameArr 名称数组
     * @returns {boolean} 如果返回 `true` 则为拥有指定的方法或属性定义，否则为没有有指定的方法或属性定义
     * @memberof PlatformModule
     */
    has(nameArr) {
        return this.access(nameArr) !== undefined;
    }

    /**
     * 初始化平台模块对象
     * @param {{lang: Object, config: Object}} settings 初始化配置
     * @param {Object} settings.lang 语言文本访问对象
     * @param {Object} settings.config 运行时配置对象
     * @return {void}
     */
    init(settings) {
        this.call('init', settings);
    }
}

/**
 * 平台模块对象访问对象
 * @type {PlatformModule}
 * @private
 */
const platform = new PlatformModule(Platform);

if (DEBUG) {
    global.$.platform = platform;
}

export default platform;
