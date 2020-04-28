import Vue from 'vue'
import {
   Dialog,
   Input,
   Button,
   ButtonGroup,
   Popover,
   Message,
} from 'element-ui'


Vue.use(Dialog)
   .use(Input)
   .use(Button)
   .use(ButtonGroup)
   .use(Popover)

Vue.prototype.$message = Message;
