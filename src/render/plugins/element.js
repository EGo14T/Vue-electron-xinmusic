import Vue from 'vue'
import {
   Dialog,
   Input,
   Button,
   ButtonGroup,
   Popover,
   Message,
   Checkbox,
   Upload
} from 'element-ui'


Vue.use(Dialog)
   .use(Input)
   .use(Button)
   .use(ButtonGroup)
   .use(Popover)
   .use(Checkbox)
   .use(Upload)

Vue.prototype.$message = Message;
