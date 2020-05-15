import Vue from 'vue'
import {
   Dialog,
   Input,
   Button,
   ButtonGroup,
   Popover,
   Message,
   Checkbox,
   Carousel,
   CarouselItem,
   Upload
} from 'element-ui'


Vue.use(Dialog)
   .use(Input)
   .use(Button)
   .use(ButtonGroup)
   .use(Popover)
   .use(Checkbox)
   .use(Upload)
   .use(Carousel)
   .use(CarouselItem)

Vue.prototype.$message = Message;
