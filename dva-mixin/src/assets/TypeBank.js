function TypeGenerator(code, num, width, height, name) {
  this.name = name;
  this.typeCode = code;
  this.nodeNum = num;
  this.width = width;
  this.height = height;
}
export default function TypeBank() {
  this[6] = new TypeGenerator(6, 0, 36, 40, '开关柜');
  this[7] = new TypeGenerator(7, 0, 36, 40, '间隔');
  this[8] = new TypeGenerator(8, 0, 41, 33, '配电房');
  this[9] = new TypeGenerator(9, 0, 27, 67, '变压器');
  this[10] = new TypeGenerator(10, 2, 27, 67, '配电变压器');
  this[11] = new TypeGenerator(11, 0, 18, 67, '开关');
  this[12] = new TypeGenerator(12, 2, 18, 67, '断路器');
  this[13] = new TypeGenerator(13, 2, 18, 67, '负荷开关');
  this[14] = new TypeGenerator(14, 2, 18, 67, '隔离开关');
  this[15] = new TypeGenerator(15, 2, 18, 67, '熔断器');
  this[16] = new TypeGenerator(16, 1, 360, 15, '母线');
  this[17] = new TypeGenerator(17, 0, 29, 66, '电容器');
  this[18] = new TypeGenerator(18, 0, 40, 28, '发电机');
  this[20] = new TypeGenerator(20, 0, 18, 67, '电缆段');
  this[21] = new TypeGenerator(21, 0, 18, 67, '电缆接头');
  this[22] = new TypeGenerator(22, 0, 18, 67, '组合开关');
  this[23] = new TypeGenerator(23, 0, 18, 67, '储能电站');
  this[24] = new TypeGenerator(24, 0, 18, 67, '电池组');
  this[25] = new TypeGenerator(25, 0, 18, 67, 'PCS');
  this[26] = new TypeGenerator(26, 0, 18, 67, '光伏电站');
  this[27] = new TypeGenerator(27, 2, 18, 67, '光伏变压器');
  this[28] = new TypeGenerator(28, 0, 18, 67, '交流汇流箱');
  this[29] = new TypeGenerator(29, 0, 18, 67, '直流汇流箱');
  this[30] = new TypeGenerator(30, 0, 18, 67, '逆变器');
  this[31] = new TypeGenerator(31, 0, 18, 67, '回路');
  this[32] = new TypeGenerator(32, 0, 39, 53, '电容器组');
  this[33] = new TypeGenerator(33, 2, 39, 53, '开关部件');
}