function Utl() {
  this.regValidate = {
    // 是否是正整数
    isPositiveInteger: (s) => {
      const re = /^[0-9]+$/;
      return re.test(s);
    },
  };
}
const utl = new Utl();
export default utl;

