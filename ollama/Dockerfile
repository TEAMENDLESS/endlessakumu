FROM ollama/ollama:latest
ARG OLLAMA_MODEL="llama3:8b-instruct"
ENV OLLAMA_KEEP_ALIVE=24h OLLAMA_MODEL=${OLLAMA_MODEL}

RUN mkdir -p /opt/ollama-models && \
    (ollama serve & sleep 5) && \
    ollama pull "${OLLAMA_MODEL}" || true && \
    pkill ollama || true && \
    cp -a /root/.ollama/. /opt/ollama-models/ || true

RUN printf '%s\n' \
'#!/bin/sh' \
'set -e' \
'mkdir -p /root/.ollama' \
'if [ -z "$(ls -A /root/.ollama 2>/dev/null || true)" ]; then' \
'  cp -a /opt/ollama-models/. /root/.ollama/ 2>/dev/null || true' \
'fi' \
'if ! ollama show "${OLLAMA_MODEL}" >/dev/null 2>&1; then' \
'  (ollama serve & sleep 3); ollama pull "${OLLAMA_MODEL}" || true; pkill ollama || true' \
'fi' \
'exec ollama serve' \
> /usr/local/bin/init-ollama.sh && chmod +x /usr/local/bin/init-ollama.sh

EXPOSE 11434
ENTRYPOINT ["/usr/local/bin/init-ollama.sh"]
