import os, subprocess, sys
from pathlib import Path
def run(*args):
 env=os.environ.copy();env['PYTHONPATH']=str(Path(__file__).parents[1]/'src')
 return subprocess.run([sys.executable,'-m','copiloto_obras',*args],cwd=Path(__file__).parents[1],env=env,text=True,capture_output=True)
def test_dry_run():
 p=run('--context','fixtures/contexts/gh01.json','--dry-run'); assert p.returncode==0 and '"api_called": false' in p.stdout and '"composition_result": "VALIDA"' in p.stdout
def test_missing_context(): assert run('--context','missing.json','--dry-run').returncode!=0
def test_invalid_context_error_does_not_echo_secret(tmp_path):
 secret='SEGREDO_CONTEXTO_NAO_ECOAR'; path=tmp_path/'invalid.json'; path.write_text('{"secret":"'+secret+'"}')
 result=run('--context',str(path),'--dry-run')
 assert result.returncode!=0 and secret not in result.stderr
