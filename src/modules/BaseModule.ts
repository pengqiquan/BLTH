import { useModuleStore } from '../stores/useModuleStore'
import Logger from '../library/logger'
import { moduleStatus, onFrameTypes, runAtMoment } from '../types/module'

class BaseModule {
  /**
   * 模块名称，在被导出时定义
   *
   * 输出控制台日志时会用到
   */
  moduleName: string
  /**
   * 当脚本在多个页面上运行的时候，该模块是否要在每个页面上运行
   *
   * 默认false，即只在Main BLTH运行的页面上运行
   *
   * 该选项为 false 时如果要确保模块不会重复运行，还需将 onFrame 设置为 target 或 top
   */
  static runOnMultiplePages: boolean = false
  /**
   * 模块运行时机，默认 document-body
   *
   * `document-start`: 尽可能早，与脚本注入时机相同
   *
   * `document-head`: `document.head`刚刚出现后
   *
   * `document-body`: `document.body`刚刚出现后
   *
   * `document-end`: `document`的`DOMContentLoaded`事件触发后
   *
   * `window-load`: `window`的`load`事件触发后
   */
  static runAt: runAtMoment = 'document-body'
  /**
   * 模块运行的 frame，默认 target
   *
   * `all`: 所有符合脚本`@match`规则的 frame
   *
   * `target`: window.BilibiliLive 存在的那个 frame
   *
   * `top`: 顶层 frame (`window.top`)
   */
  static onFrame: onFrameTypes = 'target'
  /**
   * 是否要等默认模块运行完了再运行，默认 true
   *
   * 如果设置为 true，那么就不能保证该模块被及时地执行
   *
   * 因为默认模块的运行时机总是 document-body，而且默认模块的运行时间是不确定的
   */
  static runAfterDefault: boolean = true
  /**
   * 用于在控制台中输出日志信息
   */
  logger: Logger
  /**
   * 储存所有模块信息的 Pinia Store
   */
  moduleStore = useModuleStore()
  /**
   * 推荐添加一个 config 属性来表示当前模块的配置项
   *
   * @example this.moduleStore.moduleConfig.DailyTasks.MainSiteTasks.login
   */
  config?: any
  /**
   * 如果需要在控制面板上显示模块状态，推荐添加一个 status setter 用来设置模块状态
   *
   * @example
   * public set status(s: moduleStatus) {
   *    this.moduleStore.moduleStatus.DailyTasks.MainSiteTasks.login = s
   * }
   */
  set status(_s: moduleStatus) {
    throw new Error('Method not implemented.')
  }

  constructor(moduleName: string) {
    this.moduleName = moduleName
    this.logger = new Logger(this.moduleName)
  }

  run(): void {
    throw new Error('Method not implemented.')
  }
}

export default BaseModule
