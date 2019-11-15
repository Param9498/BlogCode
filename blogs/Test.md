# My first blog

### 21/10/2019

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur condimentum volutpat fermentum. Pellentesque hendrerit, urna id faucibus dapibus, purus odio tristique purus, et egestas risus massa quis odio. Nunc in tellus sed neque gravida fringilla. Donec ut mi tincidunt, viverra orci sit amet, imperdiet mauris. Cras quis tristique sapien. Vivamus sit amet mauris malesuada, viverra orci quis, porttitor est. Curabitur varius condimentum ornare. Proin interdum nisi purus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum leo arcu, consequat nec euismod et, lobortis eget dolor. Sed sollicitudin nisi finibus, auctor risus eu, blandit neque. Fusce eu justo non enim dapibus eleifend sed a purus. Duis pulvinar accumsan purus convallis gravida. Cras feugiat dictum aliquet.

```python
def conv_net(x, keep_prob):
    """
    Create a convolutional neural network model
    : x: Placeholder tensor that holds image data.
    : keep_prob: Placeholder tensor that hold dropout keep probability.
    : return: Tensor that represents logits
    """
    
    conv_num_outputs = [32,128,512]
    conv_ksize = [(8,8),(4,4),(2,2)]
    conv_strides = (1,1)
    pool_ksize = (4,4)
    pool_strides = (2,2)
    num_outputs = 10
        
    # TODO: Apply 1, 2, or 3 Convolution and Max Pool layers
    #    Play around with different number of outputs, kernel size and stride
    # Function Definition from Above:
    #    conv2d_maxpool(x_tensor, conv_num_outputs, conv_ksize, conv_strides, pool_ksize, pool_strides)
    net = conv2d_maxpool(x, conv_num_outputs[0],conv_ksize[0],conv_strides,pool_ksize,pool_strides)    
    net = conv2d_maxpool(net, conv_num_outputs[1],conv_ksize[1],conv_strides,pool_ksize,pool_strides)
    net = conv2d_maxpool(net, conv_num_outputs[2],conv_ksize[2],conv_strides,pool_ksize,pool_strides)
        
    # TODO: Apply a Flatten Layer
    # Function Definition from Above:
    #   flatten(x_tensor)
    net = flatten(net)

    # TODO: Apply 1, 2, or 3 Fully Connected Layers
    #    Play around with different number of outputs
    # Function Definition from Above:
    #   fully_conn(x_tensor, num_outputs)
    net = fully_conn(net,512)
    net = tf.nn.dropout(net, keep_prob)
    net = fully_conn(net,128)
    net = tf.nn.dropout(net, keep_prob)
    net = fully_conn(net,32)
    
    # TODO: Apply an Output Layer
    #    Set this to the number of classes
    # Function Definition from Above:
    #   output(x_tensor, num_outputs)
    
    return output(net,num_outputs)

"""
DON'T MODIFY ANYTHING IN THIS CELL THAT IS BELOW THIS LINE
"""

##############################
## Build the Neural Network ##
##############################

# Remove previous weights, bias, inputs, etc..
tf.reset_default_graph()

# Inputs
x = neural_net_image_input((32, 32, 3))
y = neural_net_label_input(10)
keep_prob = neural_net_keep_prob_input()

# Model
logits = conv_net(x, keep_prob)

# Name logits Tensor, so that is can be loaded from disk after training
logits = tf.identity(logits, name='logits')

# Loss and Optimizer
cost = tf.reduce_mean(tf.nn.softmax_cross_entropy_with_logits(logits=logits, labels=y))
optimizer = tf.train.AdamOptimizer().minimize(cost)

# Accuracy
correct_pred = tf.equal(tf.argmax(logits, 1), tf.argmax(y, 1))
accuracy = tf.reduce_mean(tf.cast(correct_pred, tf.float32), name='accuracy')

tests.test_conv_net(conv_net)
```

Aenean eget nunc id dolor dignissim gravida vitae ut mauris. Quisque sed ipsum quis turpis aliquam pellentesque auctor vitae nibh. Nam et dictum nibh. Etiam condimentum aliquet erat, a viverra diam accumsan eget. Mauris fermentum, metus in sollicitudin dignissim, lacus odio ultrices erat, eleifend porttitor nunc tellus eget lectus. Vivamus ac semper neque, ut vehicula arcu. Morbi ante enim, tempor vel turpis et, pretium gravida lorem. Aliquam ultrices nunc nulla, vel tincidunt sapien efficitur sed. Sed pretium dui id facilisis semper. Pellentesque augue neque, eleifend ut suscipit in, hendrerit sit amet lacus. Ut diam quam, euismod id ipsum non, interdum consequat nulla.

![Minion](dist/img/minion.png)

Suspendisse potenti. Nullam ornare tortor nisi, id cursus est faucibus eget. Fusce sed lectus rhoncus, convallis nunc id, euismod metus. Phasellus viverra non dui non egestas. Suspendisse sed leo commodo, ultricies magna id, dictum felis. Donec auctor blandit lacus. Phasellus varius nisl quam, non euismod leo varius ut. Maecenas vel sapien dolor. Vivamus tincidunt tempor efficitur. Cras non facilisis sem, in sollicitudin orci. Aliquam mi ipsum, malesuada nec dapibus condimentum, aliquam in nisl. Pellentesque sodales ut nulla et ornare.

Integer non ornare mauris, et commodo nisi. Pellentesque hendrerit mauris eget erat interdum molestie. Phasellus vitae sem dapibus, vulputate lorem in, porta lorem. Nunc nec convallis orci. Vivamus suscipit enim ultricies tortor iaculis finibus. Praesent cursus tristique arcu, et convallis enim dignissim a. Integer mauris arcu, elementum sed lorem sit amet, congue rutrum purus.

Proin pharetra ex neque, et aliquam odio interdum id. Integer ornare tincidunt erat a vulputate. Vivamus blandit erat ut metus fringilla, a dictum ligula volutpat. In mattis luctus gravida. Vestibulum vel mi dictum, consequat sapien vel, pulvinar odio. In sed tortor eu turpis eleifend condimentum. Curabitur maximus tempus dolor, in fermentum arcu sagittis non. Integer fringilla sapien tempus, mattis sapien at, porta est. Integer scelerisque euismod condimentum. Nam eleifend viverra nisl, in finibus lectus sollicitudin nec. Phasellus venenatis venenatis eleifend. Suspendisse a erat erat. Fusce quis mi purus. Suspendisse feugiat risus ac mattis semper. Proin a leo ut sem maximus molestie sed non risus.