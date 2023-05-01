import gradio as gr
from transformers import pipeline
import warnings
import logging
warnings.simplefilter('ignore')
logging.disable(logging.WARNING)


def predict(image):
    cap = pipeline('image-to-text')
    caption = cap(image)

    caption_string = str(caption)

    image_caption = caption_string[21:-3]

    output = 'the image is of, ' + image_caption
    return output


input = gr.inputs.Image(
    label="Upload your Image and wait for 8-12 seconds!", type='pil', optional=False)
output = gr.outputs.Textbox(label="Captions")

title = "Content-Mod API with Sentiment-Analysis UI "

interface = gr.Interface(
    fn=predict,
    inputs=input,
    outputs=output,
    title=title,

)
interface.launch()
