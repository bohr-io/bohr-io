# ckeditor-image-uploader-plugin
An open source plugin for CKEDITOR to upload images saved on your local machine.

# How to install?

-  Click on download button, rename the folder to simage and add the entire simage folder into CKEditor plugins folder.

- You can use this plugin with CKEDITOR. You need to configure the end point where you want to store the images uploaded using this plugin. Add it in your config.js as follows:
	```
	CKEDITOR.config.extraPlugins: 'simage'  //to enable to plugin
	CKEDITOR.config.imageUploadURL: <INSERT URL>
	CKEDITOR.config.dataParser: func(data)
	```

- The `dataParser` attribute expects a `function` with a parameter in which you should pass the `data` returned by the endpoint that you have configured (`imageUploadURL`) . This function is expected to return a url. This url will be set to the `src` attribute of `image` html element.

- Example response by `imageUploadURL` endpoint:
	```
	{
		url: 'imageUrl'
	}
	```

- Example `dataParser` code:
	```
	function(data){
		if (data){
			var keys = Object.keys(data)
			return data[keys[0]].url
		}
	}
	```

- You can also use `srcset` attribute to display the image based on resolution of the display. To read more about `srcset` refer to:
[Link to read more about srcset](https://webkit.org/demos/srcset/)
This is `optional`, in case you don't specify `srcset` attribute in config.js, it will pick up the image from `src` which is set by the return value of `dataParser` function. 
`srcSet` attribute should be configured to be a function which returns the expected string that you want to set in `srcset` html attribute. Response returned by the endpoint that you have configured is passed to this function as an argument. Add the following statement in config.js to enable `srcset`:

	```config.srcSet: func(data)```

- Example of data expected by `srcset` function
	```
	{
		1x: {url:'imageUrl', ...},
		2x: {url:'imageUrl', ...},
		3x: {url:'imageUrl', ...},
		4x: {url:'imageUrl', ...},
		original: {url:'someurl', ...}
	}
	```

- Example `srcSet` function:
	```
	function(data){
		if(data){
			var keys = Object.keys(data).splice(1)
			var str = ''
			keys.forEach(function(key, i){
				str += data[key].url + ' ' + (keys.length - i) + 'x, '
			})
			return str.slice(0, -2)
		}
	}
	```

The above function should return a `string` of the following form:
	```"image-1x.png 1x, image-2x.png 2x, image-3x.png 3x, image-4x.png 4x"```
	
- You can listen to `preventFormSubmit` event to do anything while the image is uploading. 
For example, this can be a hook to display a wait icon while the image is uploading. 
Similarly, you can use the event `enableFormSubmit` to perform any action after image has successfully uploaded or the image upload failed. For example, you can remove the wait icon at this point. 


