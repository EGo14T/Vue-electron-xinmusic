import Vue from 'vue'
import {
   Dialog,
   Input,
   Button,
   ButtonGroup,
   Popover,
   Message,
   Checkbox
} from 'element-ui'


Vue.use(Dialog)
   .use(Input)
   .use(Button)
   .use(ButtonGroup)
   .use(Popover)
   .use(Checkbox)

Vue.prototype.$message = Message;
