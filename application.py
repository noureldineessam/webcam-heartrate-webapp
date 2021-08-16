from flask import Flask, request, render_template, jsonify
import numpy as np
import time
from flask_cors import CORS
import cv2
import pylab
import os
import sys

application = app = Flask(__name__)
CORS(app, support_credentials=True)

@app.route('/')
def index():
    return render_template('index.html')

# ------------------------------------------------------------------------------
# ----------------------------Server-Side Processing----------------------------
# ------------------------------------------------------------------------------
# @app.route('/compute', methods=['POST'])
# def compute():
#     req=request.get_json()
#     vals=req["datapoint"]
#     durationR=req["duration"]
#     class findFaceGetPulse(object):
#         def __init__(self):
#             self.frame_in = np.zeros((10, 10))
#             self.frame_out = np.zeros((10, 10))
#             self.fps = 0
#             self.buffer_size = 250
#             self.data_buffer = []
#             self.times = []
#             self.ttimes = []
#             self.samples = []
#             self.freqs = []
#             self.fft = []
#             self.slices = [[0]]
#             self.t0 = time.time()
#             self.bpms = []
#             self.bpm = 0
#             self.data_buffer = vals
#             self.L = len(self.data_buffer)
#             self.times.append(time.time() - self.t0)
#             if self.L > self.buffer_size:
#                 self.data_buffer = self.data_buffer[-self.buffer_size:]
#                 self.L = self.buffer_size

#             processed = np.array(self.data_buffer)
#             self.samples = processed
#             if self.L > 10:
#                 self.output_dim = processed.shape[0]

#                 self.fps = float(250) / (2*durationR/1000)
#                 #     even_times = np.linspace(self.times[0], self.times[-1], L)
#                 #     interpolated = np.interp(even_times, self.times, processed)
#                 #     interpolated = np.hamming(L) * interpolated
#                 #     interpolated = interpolated - np.mean(interpolated)
#                 #     raw = np.fft.rfft(interpolated)
#                 #     phase = np.angle(raw)
#                 #     self.fft = np.abs(raw)
#                 #     self.freqs = float(self.fps) / L * np.arange(L / 2 + 1)

#                 #     freqs = 60. * self.freqs
#                 #     idx = np.where((freqs > 50) & (freqs < 180))

#                 #     pruned = self.fft[idx]
#                 #     phase = phase[idx]

#                 #     pfreq = freqs[idx]
#                 #     self.freqs = pfreq
#                 #     self.fft = pruned
#                 #     if pruned:
#                 #         idx2 = np.argmax(pruned)
#                 #         t = (np.sin(phase[idx2]) + 1.) / 2.
#                 #         t = 0.9 * t + 0.1
#                 #         alpha = t
#                 #         beta = 1 - t

#                 #         self.bpm = self.freqs[idx2]
#                 #         self.idx += 1

#                 #         x, y, w, h = self.get_subface_coord(0.5, 0.18, 0.25, 0.15)
#                 #         r = alpha * self.frame_in[y:y + h, x:x + w, 0]
#                 #         g = alpha * \
#                 #             self.frame_in[y:y + h, x:x + w, 1] + \
#                 #             beta * self.gray[y:y + h, x:x + w]
#                 #         b = alpha * self.frame_in[y:y + h, x:x + w, 2]
#                 #         self.frame_out[y:y + h, x:x + w] = cv2.merge([r,
#                 #                                                     g,
#                 #                                                     b])
#                 #         x1, y1, w1, h1 = self.face_rect
#                 #         self.slices = [np.copy(self.frame_out[y1:y1 + h1, x1:x1 + w1, 1])]
#                 #         col = (100, 255, 100)
#                 #         gap = (self.buffer_size - L) / self.fps

#                 #         if gap:
#                 #             text = "(estimate: %0.1f bpm, wait %0.0f s)" % (self.bpm, gap)
#                 #         else:
#                 #             text = "(estimate: %0.1f bpm)" % (self.bpm)
#                 #         tsize = 1
#                 #         cv2.putText(self.frame_out, text,
#                 #                 (int(x - w / 2), int(y)), cv2.FONT_HERSHEY_PLAIN, tsize, col)
#     return  jsonify({'compted': findFaceGetPulse().fps })

if __name__ == '__main__':
    app.run(debug=True)

    