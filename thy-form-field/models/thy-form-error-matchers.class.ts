// class EmailErrorMatecher implements ErrorStateMatcher {

//     public regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  
//     private vm: ThyUserConfigurationViewModel;
  
//     constructor(vm: ThyUserConfigurationViewModel) {
//       this.vm = vm;
//     }
  
//     isErrorState(control?: FormControl | null, form?: FormGroupDirective | NgForm | null): boolean {
//       if (this.vm.Email && this.vm.Email.Address) {
//         const regRes = this.vm.Email.Address.match(new RegExp(this.regex, 'g'));
//         if (!regRes) {
//           return true;
//         }
//       }
//       return false;
//     }
    
//   }
  
//   class PhoneErrorStateMatcher implements ErrorStateMatcher {
  
//     private vm: ThyUserConfigurationViewModel;
  
//     public regex = '^[0-9\+?][0-9]*$';
  
//     public get errorMessage(): string {
//       if (this.vm.Phone && this.vm.Phone.Address) {
//         const regRes = this.vm.Phone.Address.match(new RegExp(this.regex, 'g'));
//         if (!regRes) {
//           return '@error-invalidCharacters';
//         }
//         if (this.vm.Phone.Address.charAt(0) === '+') {
//           if (this.vm.Phone.Address.startsWith('+33')) {
//             if (this.vm.Phone.Address.length === 12) {
//               return null;
//             } else {
//               return '@error-invalidLength';
//             }
//           } else {
//             return null;
//           }
//         } else {
//           return null;
//         }
//       }
//       return null;
//     }
  
//     constructor(vm: ThyUserConfigurationViewModel) {
//       this.vm = vm;
//     }
  
//     isErrorState(control?: FormControl | null, form?: FormGroupDirective | NgForm | null): boolean {
//       if (this.vm.Phone && this.vm.Phone.Address) {
//         const regRes = this.vm.Phone.Address.match(new RegExp(this.regex, 'g'));
//         if (!regRes) {
//           return true;
//         }
//         if (this.vm.Phone.Address.charAt(0) === '+') {
//           if (this.vm.Phone.Address.startsWith('+33')) {
//             if (this.vm.Phone.Address.length === 12) {
//               return false;
//             } else {
//               return true;
//             }
//           } else if (this.vm.Phone.Address.length > 1) {
//             return false;
//           } else {
//             return true;
//           }
//         } else {
//           return false;
//         }
//       }
//       return false;
//     }
  
//   }