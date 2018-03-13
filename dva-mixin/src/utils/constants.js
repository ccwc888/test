
// 设备类型编码(主要指在台账树上的设备类型编码)
export const DEVICE_TOPO_TYPE = {
  /**
   * 站点: 01
   */
  STATION: '01',
  /**
   * 配电房: 02
   */
  SUBSTATION: '02',
  /**
   * 关口变压器: 03
   */
  MAINTRANSFORMER: '03',
  /**
   * 非关口变压器: 07
   */
  SUBTRANSFORMER: '07',
  /**
   * 总回路: 05
   */
  MAINCIRCUIT: '05',
  /**
   * 联络回路: 06
   */
  CONTACTCIRCUIT: '06',
  /**
   * 子回路: 09
   */
  SUBCIRCUIT: '09',
  /**
   * 关口计量点: 04
   */
  MAINMEASURINGPOINT: '04',
  /**
   * 非关口监测点: 08
   */
  SUBMONITOR: '08',
  /**
   * 配电设备: 10
   */
  DISTRIBUTIONDEVICE: '10',
  /**
   * 关口变压器上的监测点: 11
   */
  MAINTRANSFORMERMONITOR: '11',
  /**
   * 开关: 12
   */
  SWITCHER: '12',
  /**
   * 电容器
   */
  CAPACITOR: '13',
  /**
   * 电容器组
   */
  CAPACITORGROUP: '14',
  /**
   * 自备发电机
   */
  ALTERNATOR: '15',
  /**
   * 开关柜(电容柜)
   */
  SWITCHERCABINET: '16',
  /**
   * 母线
   */
  BUSBAR: '17',
};
